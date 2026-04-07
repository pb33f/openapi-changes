Output .github/assets/summary.gif
Output dist/demos/summary.mp4

Set Shell "zsh"
Set FontSize 22
Set Width 1800
Set Height 1200
Set Theme "GitHub Dark"
Set TypingSpeed 0ms
Set Framerate 30

Require ./bin/openapi-changes

Type "script -q /dev/null zsh -lc 'env -u NO_COLOR TERM=xterm-256color COLORTERM=truecolor ./bin/openapi-changes summary --no-logo sample-specs/petstorev3-original.json sample-specs/petstorev3.json' | less -R"
Enter
Sleep 2s
Space
Sleep 1800ms
Space
Sleep 1800ms
Space
Sleep 1800ms
Space
Sleep 1500ms
Type "q"
