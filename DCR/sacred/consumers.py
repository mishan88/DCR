from django.http import HttpResponse
from channels.handler import AsgiHandler
from channels import Group

def http_consumer(message):
    response = HttpResponse("Hllllll %s" % message.content['path'])
    for chunk in AsgiHandler.encode_response(response):
        message.reply_channel.send(chunk)

def ws_add(message):
    message.reply_channel.send({'accept':True})
    Group("chat").add(message.reply_channel)

def ws_message(message):
    Group("chat").send({
        "text": "[user] %s" % message.content['text']
    })

def ws_disconnect(message):
    Group("chat").discard(message.reply_channel)
