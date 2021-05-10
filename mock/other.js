const content = '<h1 style="text-align: center;">Welcome to the TinyMCE demo!</h1><p style="text-align: center; font-size: 15px;"><img title="TinyMCE Logo" src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" alt="TinyMCE Logo" width="110" height="97" /><ul>\n' +
  '        <li>Our <a href="//www.tinymce.com/docs/">documentation</a> is a great resource for learning how to configure TinyMCE.</li><li>Have a specific question? Visit the <a href="https://community.tinymce.com/forum/">Community Forum</a>.</li><li>We also offer enterprise grade support as part of <a href="https://tinymce.com/pricing">TinyMCE premium subscriptions</a>.</li>\n' +
  '      </ul>'

module.exports = [
  {
    url: '/other/get-tinymce',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          content: content
        },
        message: 'success'
      }
    }
  }
]
