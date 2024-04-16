newstitle_object = checkTitle("")
processes = [newstitle_object.spelling_mistakes, newstitle_object.classify_clickbait, newstitle_object.subjective_test, newstitle_object.is_newstitle, newstitle_object.present_on_google]
names = ['Checkingforspellingmistakes', 'Checkingforclickbaittitle', 'Checkingforsubjectivetitles', 'Checkingforvalidnewstitle', 'Checkingforwebavailability']
index = -1
pages = ['spellfail.html', 'clickfail.html', 'subjecfail.html', 'newtitilefail.html', 'availweb.html']
headline = ''
last_executed = True