from django import forms

class ChatForm(forms.Form):
    your_name = forms.CharField(label='name', max_length='50')
    your_message = forms.CharField(label='message', max_length='500')
