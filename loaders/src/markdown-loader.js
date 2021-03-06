/* eslint no-console: 0 */
const frontMatter = require('front-matter');
const markdownIt = require('markdown-it');
const markdownItMathjax = require('markdown-it-mathjax');
const hljs = require('highlight.js');
const _ = require('lodash');

const highlight = (str, lang) => {
  if ((lang !== null) && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(lang, str).value;
    } catch (_error) {
      console.error(_error);
    }
  }
  return '';
};

const markdown = markdownIt({
  highlight,
  html: true,
}).use(markdownItMathjax());

module.exports = function markdownLoader(content) {
  this.cacheable();
  const meta = frontMatter(content);
  const body = markdown.render(meta.body);
  const result = _.merge({}, meta.attributes, { body });
  return `module.exports = ${JSON.stringify(result)}`;
};
