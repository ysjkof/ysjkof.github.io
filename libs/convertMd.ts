import { marked, Renderer } from "marked";
import hljs from "highlight.js/lib/core";
import hljsJavascript from "highlight.js/lib/languages/javascript";
import sanitize from "sanitize-html";

const convertMarkdown = (markdown: any) => {
  // const renderer = {
  //     heading(text, level) {
  //       const escapedText = text.toLowerCase().replace(/[^\w]+/g, "-");

  //       return `
  //               <h${level}>
  //                 <a name="${escapedText}" class="anchor" href="#${escapedText}">
  //                   <span class="header-link"></span>
  //                 </a>
  //                 ${text}
  //               </h${level}>`;
  //     },
  //   };
  //   marked.use({ renderer });
  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code, lang) {
      hljs.registerLanguage("javascript", hljsJavascript);
      return hljs.highlight(code, { language: "javascript" }).value;
    },
    langPrefix: "hljs language-",
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false,
  });
  // const sanitizedMarkdown = sanitize(markdown);
  // const parsedHtml = marked(sanitizedMarkdown);
  const parsedHtml = marked(markdown);
  return parsedHtml;
};

export default convertMarkdown;
