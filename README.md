# web2021

![Build and Deploy](https://github.com/WISSOrg/web2020/workflows/Build%20and%20Deploy/badge.svg)

__Warning: This repository may contain information that has not officially been confirmed.__

WISS 2021 web page.

## Principles

- Static
- Easy-to-learn (for non-experts)
- Easy-to-edit (for committee members)

## Technical Choices

- GitHub Pages for deploy
- Pug + Sass for generating static pages
- Markdown for main texts

## Prerequisite

- npm

## Install Dependencies

```
npm install
```

## Build

```bash
npm run build
```

## Deploy

The changes pushed to the master branch will be automatically deployed to GitHub Pages via GitHub Action.

## Source Structure

- `src/*.pug`: Pug files that will be compiled as HTMLs.
- `src/includes/*.pug`: Pug files that will be included by other pug files.
- `src/md/*.md`: Markdown files that will be included in corresponding pug files.
- `src/sass/*.sass`: Sass files that will be compiled as CSSs.
- `src/data/**/*`: Meta data files that will be referred during compilation.
- `src/downloads/**/*`: Asset files that will be copied as they are.
- `src/assets/**/*`: Asset files that will be properly processed (e.g., for compression) during compilation and will be referred by HTMLs.

## CSS

For simplicity, this website uses the vanilla Bootstrap 4 framework distributed via CDN with a custom CSS that overwrites some attributes.

## Design

## License

All rights reserved by WISS.

## Contributing

Issues and Pull Requests are highly appreciated, but please
- (1) understand that the rights on your contribution will belong to WISS, and
- (2) confirm that you do not violate any third parties' rights.
