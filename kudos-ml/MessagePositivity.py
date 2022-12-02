import shutil
from transformers import AutoModelForSequenceClassification
from transformers import TFAutoModelForSequenceClassification
from transformers import AutoTokenizer
import numpy as np
from scipy.special import softmax
import csv
import urllib.request

# model citation: https://huggingface.co/cardiffnlp/twitter-roberta-base-sentiment

# Preprocess text (username and link placeholders)


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


task = 'sentiment'
MODEL = f"cardiffnlp/twitter-roberta-base-{task}"

tokenizer = AutoTokenizer.from_pretrained(MODEL)

# download label mapping
labels = []
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

    rankings_list = []
    score_dict = {}

    ranking = np.argsort(scores)
    ranking = ranking[::-1]
    for i in range(scores.shape[0]):
        l = labels[ranking[i]]
        s = scores[ranking[i]]
        # can comment out to not show
        print(f"{i+1}) {l} {np.round(float(s), 4)}")
        score_dict[labels[ranking[i]]] = scores[ranking[i]]
        rankings_list.append(l)

    return [rankings_list[0], score_dict]


def PositivityCheck(text):

    scores = PT(MODEL, text)
    results = get_result(scores, labels)
    shutil.rmtree("./cardiffnlp")
    if results[0] == 'positive' or results[0] == 'neutral':
        return [True, results[1]]
    return [False, results[1]]
