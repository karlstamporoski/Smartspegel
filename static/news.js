// rss source
const RSS_URL = `https://rss.aftonbladet.se/rss2/small/pages/sections/nyheter/`;


$.ajax(RSS_URL, {
      accepts: {
        xml: "application/rss+xml"
      },
      dataType: "xml",
      success: function (data) {

        //creates a template and target elements
        $(data)
          .find("item")
          .each(function () {
            const el = $(this);

            const template = `
          <News>
            <rubrik>
              <a href="${el
                .find("link")
                .text()}" target="_blank" rel="noopener">
                ${el.find("title").text()}
              </a>
            </rubrik>
            <p>
                <a href="${el
                    .find("link")
                    .text()}" target="_blank" rel="noopener">
                    ${el.find("description").text()}
                </a>
            </p>
          </News>
        `;
            // insert text as HTML
            document.getElementById('News').innerHTML = template;
          });
      }
});
