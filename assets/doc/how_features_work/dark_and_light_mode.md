[&#X21e7; back to the "README" &#X21e7;](../../../README.md)

# Dark and Light mode

Switches the colors from **light mode** to **dark mode** when the icon in the "navbar" is toggled.

1. when the dark mode icon in the "navbar" is clicked
   1. the `dark` class is added to the `<html>` element  
      (_which will curse "Tailwind" to overwrite all classes with the matching `dark:` class, therefore enabling the dark color layout_)
   2. the **dark icon** get's the `hidden` class and the **light icon** get's the `hidden` class removed which will swap there appearance in the "navbar"
2. when the light mode icon in the "navbar" is clicked,  
   the same effect applies as under 1. just opposite

**NOTE: Every class gets replaced with an equivalent `dark:` class (_if it exist_) on dark mode.**

- link to [tailwindcss dark-mode documentation](https://tailwindcss.com/docs/dark-mode)
- link to [Navbar](../../../components/Navbar.tsx) component which contains the code
