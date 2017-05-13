from django.http import HttpResponse
from channels.handler import AsgiHandler
from channels import Group
from channels.sessions import channel_session

@channel_session
def ws_add(message):
    message.reply_channel.send({'accept': True})
    Group(message['path'].replace('/', '')).add(message.reply_channel)
    message.channel_session['room'] = message['path'].replace('/', '')

@channel_session
def ws_message(message):
    Group(message['path'].replace('/', '')).send({
        'text': message.content['text']
    })

@channel_session
def ws_disconnect(message):
    Group(message['path'].replace('/', '')).discard(message.reply_channel)
