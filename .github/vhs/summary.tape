Output .github/assets/summary.gif
Output dist/demos/summary.mp4

Set Shell "zsh"
Set FontSize 22
Set Width 1800
Set Height 1200
Set Theme "Builtin Solarized Dark"
Set TypingSpeed 0ms
Set Framerate 30

Require ./bin/openapi-changes

Type "./bin/openapi-changes summary --no-logo sample-specs/petstorev3-original.json sample-specs/petstorev3.json"
Enter
Sleep 5s
