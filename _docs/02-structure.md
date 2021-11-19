---
title: "Structure"
permalink: /docs/structure/
excerpt: "How the theme is organized and what all of the files are for."
last_modified_at: 2018-03-20T15:19:22-04:00
---

Nothing clever here :wink:. Layouts, data files, and includes are all placed in their default locations. Stylesheets and scripts in `assets`, and a few development related files in the project's root directory.

**Please note:** If you installed Minimal Mistakes via the Ruby Gem method, theme files like `_layouts`, `_includes`, `_sass`, and `/assets/` will be missing. This is normal as they are bundled with the [`minimal-mistakes-jekyll`](https://rubygems.org/gems/minimal-mistakes-jekyll) Ruby gem. If you would like to make changes, create the files and Jekyll will prefer your local copy.
{: .notice--info}

```bash
minimal-mistakes
├── _data                      # data files for customizing the theme
|  ├── navigation.yml          # main navigation links
|  └── ui-text.yml             # text used throughout the theme's UI
├── _includes
|  ├── analytics-providers     # snippets for analytics (Google and custom)
|  ├── comments-providers      # snippets for comments
|  ├── footer
```
