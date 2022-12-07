def frequent_used_words(freq_list):
    # find the most used word in freq
    max_key = []
    max_value = 0
    for key, value in freq_list.items():
        if value > max_value:
            max_key = [key]
            max_value = value

        elif value == max_value:
            max_key.append(key)

    return max_key

def incoming_message(message, keeper): # without category
    # add new word in list of word if it is not already in
    if message not in keeper:
        keeper.append(message)
    return keeper

def CountFrequency(keeper):
    # count frequency use of each word in a list of words in a dictionary
    freq = {}
    for item in keeper:
        if (item in freq):
            freq[item] += 1
        else:
            freq[item] = 1
    return freq

def printCount(freq_list):   # without category
    # function to print the dictionary of frequency list
    for key, value in freq_list.items():
        print ("% s : % d"%(key, value))

# example use cases can comment out
keeper = ["Thanks", "Thanks", "Thanks", "Congrat", "Smile", "Congrat", "Geat job", "cat", "cat", "cat"]

incoming_message("cat", keeper) # category
incoming_message("dog", keeper) # category
 
freq_list = CountFrequency(keeper)
printCount(freq_list)
