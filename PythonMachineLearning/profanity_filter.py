from profanity import profanity

words = profanity.get_words()

negative_words = ["ass", "fck", "fk", "fuk", "sh!t", "useless", "trash", "incompetent", "bad job", "annoy"]

profanity.load_words(words + negative_words)
profanity.set_censor_characters("*")
print(profanity.censor("shit ass incompetent useless trash"))

print(profanity.contains_profanity("sleepy"))

