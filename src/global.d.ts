// Глобальная декларация типов

// https://stackoverflow.com/questions/41336858/how-to-import-css-modules-with-typescript-react-and-webpack

declare module '*.scss' {
    interface IClassNames {
      [className: string]: string
    }
    const classNames: IClassNames;
    export = classNames;
  }