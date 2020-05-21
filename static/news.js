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
          .find("item").slice(-7)
          .each(function () {
            counter = 5
            const el = $(this);

            const template = `
            <header>
              <a ="${el
                .find("link")
                .text()}" target="_blank" rel="noopener">
                ${el.find("title").text()}
              </a>
            </header>
            <content>
              <a ="${el
                  .find("link")
                  .text()}" target="_blank" rel="noopener">
                  ${el.find("description").text()
                .slice(2)} 
              </a>
            </content>
      `;
      // insert text as HTML
      document.querySelector(".NewsFeed").insertAdjacentHTML("beforeend", template);
    });
}
});
