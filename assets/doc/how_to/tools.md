[&#X21e7; back to the "README" &#X21e7;](../../../README.md)

# Tools

This document contains list of tools which help creating and maintaining the project.

---

## TODO Highlight

Highlight TODO, FIXME and other annotations within your code.

### how to use it

1. write a comment, followed by the keyword (`TODO`, `FIXME`) + `:`, write a message

```JSX
  // FIXME: fix typescript error
  const { userLoggedIn } = useContext(UserLoggedInContext);
```

2. open the "command palette" (_SHIFT+CTR+p_) and tip `list`, select the command:

```
TODO-Highlight: List highlighted annotations
```

3. choose from the drop down menu which one you want to highlight
4. in the terminal under "OUTPUT" a list of the keywords with its comments and a link to the code appears

---
