[&#X21e7; back to the "README" &#X21e7;](../../../README.md)

# Typography

## how to import fonts

1. choose font, for example [google fonts](https://fonts.google.com/)
2. select the style(s)
3. choose the option "\<link\>" and copy the code
4. go to `zotankepes_website/pages/_document.tsx` and insert the code between the `<Html>` and the `<Head />` tag

```html
<html lang="en">
  {/* google font */}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
  <link
    href="https://fonts.googleapis.com/css2?family=Audiowide&display=swap"
    rel="stylesheet"
  />
  <head />
</html>
```

**note:** you may have to change `crossorigin` to `crossorigin=""`

---

## audiowide

![audiowide font](../../images/doc_images/typography/font_audiowide.webp)

- used for the logo and main headings

### About

Audiowide is a sans serif, technology styled, typeface composed of soft corner tubular forms. With vague nods to letter styles like that of Handel Gothic and the Converse logo, Audiowide veers off in a direction of its own for a slightly more techno-futuristic and yet cleanly readable typestyle.

Designed by Brian J. Bonislawsky for Astigmatic (AOETI). Audiowide is a Unicode typeface family that supports languages that use the Latin script and its variants, and could be expanded to support other scripts. To contribute to the project contact Brian J. Bonislawsky.

### Designer

Principal design "Astigmatic"

---
