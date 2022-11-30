from transformers import pipeline

# model citation: https://huggingface.co/xlm-roberta-base
unmasker = pipeline('fill-mask', model='bert-base-uncased')

def predict_words_extraction(process_list):
    predicted_list = []

    for prediction in process_list:
        predicted_list.append(prediction['token_str'])
        #print(prediction['token_str'])
    
    return predicted_list

def preprocess_fill_last(message):
    message += " [MASK]."
    return message

# raw_message = "Thanks for the"  # ** add new message here **

def words_suggestion(raw_message):
    text = preprocess_fill_last(raw_message)
    process_list = unmasker(text)
    prediction_list = predict_words_extraction(process_list)
    return (prediction_list[0], prediction_list[1])   
    # get the first two words suggestion
    # dictionary or tuple of string

# print(suggest_words(raw_message))