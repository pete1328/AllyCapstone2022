from transformers import pipeline

# model citation: https://huggingface.co/xlm-roberta-base
unmasker = pipeline('fill-mask', model='bert-base-uncased')

#message = unmasker("Hello I'm a [MASK] model.")

def predict_words_extraction(process_list):
    predicted_list = []

    for prediction in process_list:
        predicted_list.append(prediction['token_str'])
        #print(prediction['token_str'])
    
    return predicted_list

def preprocess_fill_last(message):
    message += " [MASK]."
    return message

#message = unmasker("Hello I'm a [MASK] model.")
#predict_words = fill_blank(message)

raw_message = "Thanks for the"    # ** add new message here **

def fill_blank(raw_message):
    text = preprocess_fill_last(raw_message)
    process_list = unmasker(text)
    prediction_list = predict_words_extraction(process_list)
    return prediction_list

#text = preprocess_fill_last(raw_message)
#print(text)

#process_list = unmasker(text)
#print(process_list)

#prediction_list = predict_words_extraction(process_list)
#print(prediction_list)

print(fill_blank(raw_message))