Output .github/assets/summary.gif
Output dist/demos/summary.mp4

Set Shell "zsh"
Set FontSize 22
Set Width 1920
Set Height 1080
Set Theme "GitHub Dark"
Set TypingSpeed 0ms
Set Framerate 30

Require ./bin/openapi-changes

Type "env -u NO_COLOR TERM=xterm-256color COLORTERM=truecolor ./bin/openapi-changes summary --no-logo sample-specs/petstorev3-original.json sample-specs/petstorev3.json"
Enter
Sleep 2200ms
ScrollUp 30
Sleep 900ms
ScrollDown@180ms 12
Sleep 450ms
ScrollDown@180ms 12
Sleep 450ms
ScrollDown@180ms 12
Sleep 900ms
