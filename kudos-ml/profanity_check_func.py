from profanity import profanity

def profanity_check(message):

    words_list = message.split(" ")

    for word in words_list:
        if profanity.contains_profanity(word):
            return True
        
    return False

# receive message do a check: if return true; it has profanity then ask for modification,
# else; continue to next step 

words = profanity.get_words()
custom_ban = ["ass", "fck", "fk", "fuk", "useless", "trash", "incompetent", "annoy", "dumb"]

profanity.load_words(words + custom_ban)
profanity.set_censor_characters("*")

#print(profanity.censor("You are a shit ass incompetent useless trash!!"))
#print(profanity.contains_profanity("hungry"))

#message = "I am super sleepy"
message = "Your face piss me off"
print(profanity_check(message))

print(profanity.censor("You are a shit ass incompetent useless trash!!"))


