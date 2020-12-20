<p align="center" style="font-size: 26px">
	<b>Typescript Boilerplate for alt:V - v2.1.1</b>
</p>
<p align="center" style="font-size: 26px">
	[ <a href="https://altv.mp">altv.mp</a> | <a href="https://stuyk.com/">stuyk.com</a> ]
</p>

[❤️ Become a Sponsor of my Open Source Work](https://github.com/sponsors/Stuyk/)

[⌨️ Learn how to script for alt:V](https://stuyk.github.io/altv-javascript-guide/)

⭐ This repository if you found it useful!

### Excerpt

alt:V has a lot of Boilerplates for TypeScript. However, they have one feature missing. 

They fail to create an environment where you can support multiple resource compilations. 

This boilerplate aims to fix that and allow multiple resources to be compiled at once and all your mods to be copied over and maintain folder hierarchy.

### Features

-   Full alt:V Type Support for VSCode
-   Built in auto-copy for non-typescript files.
-   Built in handling of multiple resources for compilation.
-   Built in server restart after compilation.
-   Easily expandable resource directory.
-   [altv-pkg](https://github.com/Stuyk/altv-pkg) support for auto-downloading alt:V Server Binaries.
-   Prettier Configuration for code formatting.

### Installation

[Get NodeJS 13+](https://nodejs.org/en/download/current/)

Clone the Repository

```sh
git clone git@github.com:Stuyk/altv-typescript.git
```

Install the Repository

```sh
cd altv-typescript
npm install
```

Download Server Files

```sh
npm run update
```

Build Typescript Files

```sh
npm run build
```

Start the Server

Use any of the following commands to start it.

Based on your environment.

| Linux        | Windows (CMD)     | Windows (Powershell) |
| ------------ | ----------------- | -------------------- |
| `./start.sh` | `altv-server.exe` | `./altv-server.exe`  |

<br />

### Developer Mode

In order to make things very simple. There are a few commands you can use while you're developing.

They will automatically rebuild and start your server each time.

#### Windows

```
npm run windows
```

#### Linux

```
npm run linux
```

**End Server Runtime**

`ctrl + c` to kill your server.