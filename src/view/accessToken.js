module.exports = token => `<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/combine/npm/@zendeskgarden/css-utilities@3.0.2,npm/@zendeskgarden/css-tooltips@4.0.5,npm/@zendeskgarden/css-tags@4.0.5,npm/@zendeskgarden/css-tabs@5.0.5,npm/@zendeskgarden/css-tables@3.0.7,npm/@zendeskgarden/css-pagination@3.0.5,npm/@zendeskgarden/css-modals@6.2.2,npm/@zendeskgarden/css-menus@7.0.6,npm/@zendeskgarden/css-grid@0.1.8,npm/@zendeskgarden/css-forms@7.0.19,npm/@zendeskgarden/css-chrome@3.0.7,npm/@zendeskgarden/css-callouts@3.3.16,npm/@zendeskgarden/css-buttons@6.0.5,npm/@zendeskgarden/css-bedrock@7.0.5,npm/@zendeskgarden/css-avatars@3.0.5,npm/@zendeskgarden/css-arrows@3.1.1">
  <title>agnoStack: Shopify Access Token</title>
  <style>
    .c-btn--xs {
      display: flex;
      justify-content: center;
      min-width: 0;
      padding: 0 12px;
      line-height: 20px;
      border-radius: 4px;
      margin-left: 4px;
    }

    .c-txt__input--buttonxs {
      padding: 4px 6px;
      min-height: unset;
      align-items: center;
    }

    .container--center {
      height: 90vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .c-tooltip--light--copied {
      position: absolute;
      padding: 4px;
      top: 3px;
      right: -130px;
      z-index: 1;
    }

    .c-tooltip--hide {
      visibility: hidden;
      transition: ease-in;
    }

    .row--margin {
      margin: 20px 0;
    }

    #logo {
      display: flex;
      justify-content: center;
    }
    #logo img {
      width: 15vw;
      max-width: 175px;
    }
  </style>
</head>
<body>
  <div>
    <div class="container container--center">
      <div class="row justify-content-md-center row--margin">
        <div class="col-md-5" id="logo">
          <img src="https://agnostack.com/images/agnoStack-logo.svg"></img>
        </div>
      </div>
      <div class="row justify-content-md-center">
        <div class="col-md-5">
          <div>
            <p>
              <b>Access Token: </b>
            </p>
          </div>
        </div>
      </div>
      <div class="row justify-content-md-center">
        <div class="col-md-5">
          <div class="l-wrapper--370">
            <div class="c-txt">
              <div class="c-txt__input c-txt__input--media c-txt__input--buttonxs">
                <input class="c-txt__input c-txt__input--bare c-txt__input--media__body" id="accessToken" placeholder="token.access_token" type="text" value="${
  token.access_token
}" onclick="copy()" readonly />
                <button class="c-btn c-btn--sm c-btn--pill c-btn--primary c-btn--xs" onclick="copy()">COPY</button>
                <div class="c-tooltip--light c-tooltip--light--copied c-tooltip--hide">copied to clipboard!</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-md-center row--margin">
        <div class="col-md-6">
          <div class="c-callout c-callout--recessed">
            <div class="c-callout__title">
              Continue to access AgnoStack Configuration
            </div>
            <div class="c-callout__paragraph">
              <p>copy the access token, use as admin_access_token copy the access token, use as admin_access_token copy the access token, use as admin_access_token copy the access token, use as admin_access_token copy the access token, use as admin_access_token copy the access token, use as admin_access_token copy the access token, use as admin_access_token copy the access token, use as admin_access_token copy the access token, use as admin_access_token copy the access token, use as admin_access_token copy the access token, use as admin_access_token</p>
              <p>learn more, click <a href="https://agnostack.com/">here</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>
<script>
  function copy() {
    const copyText = document.getElementById('accessToken')
    const tooltip = document.getElementsByClassName('c-tooltip--light')[0]

    copyText.select();
    copyText.setSelectionRange(0, 99999)

    document.execCommand("copy");

    tooltip.classList.remove("c-tooltip--hide");
    setTimeout(function() {
      tooltip.classList.add("c-tooltip--hide");
    }, 500)
  }
</script>
</html>`;
