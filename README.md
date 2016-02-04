# Slack Math Plugin

A dumb little MathJS-based Slack Slash command plugin that allows you to do Math on the Slack command line, mainly for me to try out slash commands in Slack, but also handy if you want to do math.

# Running

1. export SLACK_TOKEN=XXXXXXXX
1. node server.js
1. Setup your Slack slash command in the Slack admin UI.  The SLACK_TOKEN env. variable needs to match the one Slack gives you.


# Examples

1. /math 2 + 2   // just use numbers
1. /math sqrt(a+b) || {"a":2, "b":3} 		//See mathjs, you can pass in scope
