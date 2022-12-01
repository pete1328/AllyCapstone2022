from profanity import profanity

words = profanity.get_words()

negative_words = ["tomato", "potato", "Potato", "Tomato"]   # soft example

profanity.load_words(words + negative_words)
profanity.set_censor_characters("*")
print(profanity.censor("My name is Tomato Potato!"))

print(profanity.contains_profanity("sleepy"))

