import Script from "next/script";

// Widget dell'assistente flylabs.ai, ospitato sulla piattaforma GPT Chatbot.
// L'UUID identifica il chatbot pubblico (non è un segreto: finisce comunque
// nell'HTML client). Il chatbot è addestrato sulle pagine del sito ed è
// gestibile da app.gptchatbot.it. Per disattivarlo: rimuovi <ChatbotWidget/>
// dal layout [locale].
const CHATBOT_UUID = "30d345beba264975998856aabf21f0f5";
const WIDGET_DOMAIN = "app.gptchatbot.it";

export function ChatbotWidget() {
  return (
    <>
      <Script id="gptchatbot-config" strategy="afterInteractive">
        {`window.GPTTConfig = { uuid: "${CHATBOT_UUID}", domain: "${WIDGET_DOMAIN}" };`}
      </Script>
      <Script
        src={`https://${WIDGET_DOMAIN}/widget-asset.min.js`}
        strategy="lazyOnload"
      />
    </>
  );
}
