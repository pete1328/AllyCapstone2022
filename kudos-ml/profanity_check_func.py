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
custom_ban = ["tomato", "potato", "Potato", "Tomato"]   # soft example

profanity.load_words(words + custom_ban)
profanity.set_censor_characters("*")

#print(profanity.censor("You are a potato man"))
#print(profanity.contains_profanity("hungry"))
#message = "I am super sleepy"
message = "You look like tomato"
print(profanity_check(message))

print(profanity.censor("My name is Tomato Potato!"))


