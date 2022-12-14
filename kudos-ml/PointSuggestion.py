import shutil
from transformers import AutoModelForSequenceClassification
# from transformers import TFAutoModelForSequenceClassification
from transformers import AutoTokenizer
import numpy as np
from scipy.special import softmax
import csv
import urllib.request

# model citation: https://huggingface.co/cardiffnlp/twitter-roberta-base-sentiment

# Preprocess text (username and link placeholders) 
# We dont need filter for user of twitter could delete but it's better to have
def preprocess(text):
    new_text = []
 
    for t in text.split(" "):
        t = '@user' if t.startswith('@') and len(t) > 1 else t
        t = 'http' if t.startswith('http') else t
        new_text.append(t)
    return " ".join(new_text)

# Tasks:
# emoji, emotion, hate, irony, offensive, sentiment
# stance/abortion, stance/atheism, stance/climate, stance/feminist, stance/hillary

task='sentiment'
MODEL = f"cardiffnlp/twitter-roberta-base-{task}"

tokenizer = AutoTokenizer.from_pretrained(MODEL)

# download label mapping
labels=[]
mapping_link = f"https://raw.githubusercontent.com/cardiffnlp/tweeteval/main/datasets/{task}/mapping.txt"
with urllib.request.urlopen(mapping_link) as f:
    html = f.read().decode('utf-8').split("\n")
    csvreader = csv.reader(html, delimiter='\t')
labels = [row[1] for row in csvreader if len(row) > 1]

def PT(MODEL, text):
    # PT
    model = AutoModelForSequenceClassification.from_pretrained(MODEL)
    model.save_pretrained(MODEL)

    text = preprocess(text)
    encoded_input = tokenizer(text, return_tensors='pt')
    output = model(**encoded_input)
    scores = output[0][0].detach().numpy()
    scores = softmax(scores)

    return scores

def get_result(scores, labels):

    result_list = []
    
    ranking = np.argsort(scores)
    ranking = ranking[::-1]
    for i in range(scores.shape[0]):
        temp_list = []
        l = labels[ranking[i]]
        s = scores[ranking[i]]
        # print(f"{i+1}) {l} {np.round(float(s), 4)}")  
        # # can comment out to not show

        temp_list.append(l)
        temp_list.append(s)
        result_list.append(temp_list)

    return result_list

def kudos_predict(text):

    scores = PT(MODEL, text)
    result_list = get_result(scores, labels)
    shutil.rmtree("./cardiffnlp")

    points = 0
    
    # equation to calculate point suggestion
    # final point = positive out of 1 - 2 (neutral) - 10 (negative)
    for element in result_list:
        if element[0] == "positive":
            points += element[1]
        elif element[0] == "neutral":
            points -= 2 * element[1]
        else:
            points -= 10 * element[1]

    m = points
    r_min = 0.9
    r_max = 1 
    t_min = 25
    t_max = 1000

    new_points = ((m - r_min)/(r_max - r_min)) * (t_max - t_min) + t_min

    if new_points < 0:    # will get deny in positivity check later
        return 25

    new_points = new_points.round()

    last_two_digits = abs(new_points) % 100 

    int(new_points)
    int(last_two_digits)

    new_points -= last_two_digits
    if last_two_digits >= 25 and last_two_digits < 50:
        points_scale = 25
    elif last_two_digits >= 50 and last_two_digits < 75:
        points_scale = 50
    elif last_two_digits >= 75 and last_two_digits < 100:
        points_scale = 75
    else: # last_two_digits == 00 or last_two_digits < 25:
        points_scale = 0

    new_points += points_scale
    result = int(new_points)
    return result
        