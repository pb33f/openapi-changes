Output .github/assets/console.gif
Output dist/demos/console.mp4

Set Shell "zsh"
Set FontSize 20
Set Width 2048
Set Height 1120
Set Theme "GitHub Dark"
Set TypingSpeed 0ms
Set Framerate 30

Require ./bin/openapi-changes

# Launch the real console against the repo history for the petstore fixture.
Type "env -u NO_COLOR TERM=xterm-256color COLORTERM=truecolor ./bin/openapi-changes console --no-logo ./ sample-specs/petstorev3.json"
Enter
Sleep 200ms

# Timeline pass one: move around a little so the history is visible.
Type "k"
Sleep 300ms
Type "k"
Sleep 300ms
Type "k"
Sleep 300ms
Type "k"
Sleep 300ms
Type "k"
Sleep 300ms
Enter
Sleep 300ms
Type "j"
Type "j"
Type "j"
Type "j"
Type "j"
Type "j"
Type "j"

Ctrl+[
Ctrl+[

Type "k"
Sleep 300ms


# Open the highlighted change set and browse the tree a little.
Enter
Sleep 1s
Type "j"
Sleep 700ms
Type "j"
Sleep 700ms

# Return to the timeline and select another change set.
Ctrl+[
Sleep 1s
Type "j"
Sleep 700ms
Enter
Sleep 1s

# Walk down to a leaf change, then open the large code/detail view.
Type "j"
Sleep 500ms
Type "j"
Sleep 500ms
Type "j"
Sleep 500ms
Enter
Sleep 1s

# Scroll the large view a bit and stop on the detail.
Type "j"
Sleep 700ms
Type "j"
Sleep 700ms
Type "k"
Sleep 700ms
