export const UI_LANGUAGES = [
  "tr", "en", "de", "fr", "es", "it", "pt", "nl", "pl", "ru", "uk",
  "ar", "fa", "hi", "bn", "id", "vi", "th", "zh", "ja", "ko"
];

export const RTL_UI_LANGUAGES = new Set(["ar", "fa"]);

export const UI_MESSAGE_KEYS = [
  // 0-6
  "appTitle", "liveAudioTranslation", "liveTranslation", "modelLabel",
  "apiKeyLabel", "apiKeyPlaceholder", "apiHint",
  // 7-13
  "show", "hide", "toggleKey", "baseLabel", "geminiBaseHelp",
  "qwenBaseHelp", "stored",
  // 14-20
  "saving", "saved", "saveFailed", "sourceLanguage", "targetLanguage",
  "autoGemini", "qwenTextOnly",
  // 21-27
  "originalAudio", "translatedAudio", "dataUse", "dataDisclosure", "consent",
  "privacy", "start",
  // 28-34
  "stop", "ready", "connecting", "translating", "stopped", "translationStopped",
  "audioChunks",
  // 35-41
  "original", "translation", "disclaimer", "reset", "errorConsent",
  "errorActiveTab", "errorPermission",
  // 42-48
  "errorApiKey", "errorSettings", "errorUrl", "errorAudio", "errorConnection",
  "errorUnknown", "serviceMessage"
];

// Every row is grouped in the same seven-message blocks as UI_MESSAGE_KEYS.
// Product/provider names are supplied as variables and intentionally remain proper nouns.
const ROWS = {
  tr: [
    "Youtube Canlı Ses Çevirisi", "gerçek zamanlı sesli çeviri", "gerçek zamanlı çeviri", "Çeviri modeli", "{provider} API anahtarı", "{service} API anahtarı", "Anahtar yalnızca bu tarayıcı oturumunun belleğinde tutulur ve {provider} bağlantısında kullanılır.",
    "Göster", "Gizle", "Anahtarı göster/gizle", "{provider} Base URL", "Google AI Studio/Gemini API adresi veya Gemini Live uyumlu özel bir HTTPS/WSS uç noktası girin.", "QwenCloud, Alibaba Singapur workspace adresi veya Qwen Realtime uyumlu özel bir HTTPS/WSS uç noktası girin.", "Bu cihazda saklanır.",
    "Kaydediliyor…", "Kaydedildi.", "Kaydedilemedi.", "Kaynak dil", "Hedef dil", "Otomatik algılanır (Gemini)", "Seçtiğiniz hedef dil Qwen’de yalnızca metin çıktısını destekler; çevrilmiş ses oynatılmaz.",
    "Orijinal ses", "Çeviri sesi", "Veri kullanımı", "Başlattığınızda seçili sekmenin sesi ve oluşan transkriptler, gerçek zamanlı çeviri için girdiğiniz Base URL’deki API hizmetine gönderilir. Varsayılan adresler Google Gemini ve Alibaba/QwenCloud hizmetleridir. API anahtarınız yalnızca seçtiğiniz API alanında kimlik doğrulaması için kullanılır. Geliştiricinin sunucusuna veri gönderilmez.", "Bu veri aktarımını anladım ve çeviriyi başlatmayı kabul ediyorum.", "Gizlilik Politikası", "▶ Kabul et ve başlat",
    "■ Durdur", "Hazır", "{provider} bağlantısı kuruluyor…", "Canlı çeviri çalışıyor", "Durduruldu", "Çeviri durdu", "{count} ses parçası",
    "ORİJİNAL", "ÇEVİRİ", "Bağımsız bir üçüncü taraf uzantısıdır; Google veya Alibaba tarafından geliştirilmiş ya da onaylanmış değildir.", "Tüm yerel ayarları ve oturum verilerini sil", "Başlatmadan önce veri aktarımı açıklamasını kabul edin.", "Aktif sekme bulunamadı. Normal bir web sekmesinde tekrar deneyin.", "Seçtiğiniz API alan adına bağlantı izni verilmedi. İzin penceresini onaylayıp yeniden deneyin.",
    "Geçerli bir {provider} API anahtarı girin.", "Model veya dil ayarı geçersiz. Seçimlerinizi kontrol edin.", "Base URL geçersiz. Tam bir HTTPS veya WSS adresi girin; kullanıcı bilgisi ve # parçası kullanmayın.", "Sekme sesi yakalanamadı veya ses işleyici başlatılamadı. Videoyu oynatıp tekrar deneyin.", "API bağlantısı kurulamadı ya da kesildi. Base URL, ağ ve sağlayıcı durumunu kontrol edin.", "Beklenmeyen bir hata oluştu. Tekrar deneyin.", "API hizmeti şu mesajı döndürdü: {message}"
  ],
  en: [
    "Youtube Live Voice Translation", "real-time audio translation", "real-time translation", "Translation model", "{provider} API key", "{service} API key", "The key is kept only in memory for this browser session and is used for the {provider} connection.",
    "Show", "Hide", "Show/hide key", "{provider} Base URL", "Enter a Google AI Studio/Gemini API address or a custom HTTPS/WSS endpoint compatible with Gemini Live.", "Enter a QwenCloud or Alibaba Singapore workspace address, or a custom HTTPS/WSS endpoint compatible with Qwen Realtime.", "Stored on this device.",
    "Saving…", "Saved.", "Could not save.", "Source language", "Target language", "Automatically detected (Gemini)", "The selected target language supports text output only in Qwen; translated audio will not be played.",
    "Original audio", "Translated audio", "Data usage", "When you start, the selected tab’s audio and generated transcripts are sent to the API service at the Base URL you entered for real-time translation. The default services are Google Gemini and Alibaba/QwenCloud. Your API key is used only to authenticate with the API host you selected. No data is sent to the developer’s server.", "I understand this data transfer and agree to start translation.", "Privacy Policy", "▶ Accept and start",
    "■ Stop", "Ready", "Connecting to {provider}…", "Live translation is running", "Stopped", "Translation stopped", "{count} audio chunks",
    "ORIGINAL", "TRANSLATION", "This is an independent third-party extension; it is not developed or endorsed by Google or Alibaba.", "Delete all local settings and session data", "Accept the data-transfer disclosure before starting.", "No active tab was found. Try again on a normal web tab.", "Connection permission for the selected API host was not granted. Approve the permission prompt and try again.",
    "Enter a valid {provider} API key.", "The model or language setting is invalid. Check your selections.", "The Base URL is invalid. Enter a full HTTPS or WSS address without credentials or a # fragment.", "Tab audio could not be captured or the audio processor could not start. Play the video and try again.", "The API connection could not be established or was interrupted. Check the Base URL, network, and provider status.", "An unexpected error occurred. Try again.", "The API service returned this message: {message}"
  ],
  de: [
    "Youtube Live-Voice-Übersetzung", "Audioübersetzung in Echtzeit", "Echtzeitübersetzung", "Übersetzungsmodell", "{provider}-API-Schlüssel", "API-Schlüssel für {service}", "Der Schlüssel bleibt nur im Speicher dieser Browsersitzung und wird für die {provider}-Verbindung verwendet.",
    "Anzeigen", "Ausblenden", "Schlüssel anzeigen/ausblenden", "{provider}-Basis-URL", "Geben Sie eine Google-AI-Studio/Gemini-API-Adresse oder einen mit Gemini Live kompatiblen HTTPS/WSS-Endpunkt ein.", "Geben Sie eine QwenCloud- oder Alibaba-Singapur-Workspace-Adresse oder einen mit Qwen Realtime kompatiblen HTTPS/WSS-Endpunkt ein.", "Auf diesem Gerät gespeichert.",
    "Wird gespeichert…", "Gespeichert.", "Speichern fehlgeschlagen.", "Ausgangssprache", "Zielsprache", "Automatisch erkannt (Gemini)", "Die gewählte Zielsprache unterstützt in Qwen nur Text; übersetztes Audio wird nicht wiedergegeben.",
    "Originalton", "Übersetzter Ton", "Datennutzung", "Beim Start werden der Ton des ausgewählten Tabs und die erzeugten Transkripte zur Echtzeitübersetzung an den API-Dienst der eingegebenen Basis-URL gesendet. Standardmäßig werden Google Gemini und Alibaba/QwenCloud verwendet. Ihr API-Schlüssel dient nur der Authentifizierung beim gewählten API-Host. An den Server des Entwicklers werden keine Daten gesendet.", "Ich verstehe diese Datenübertragung und stimme dem Start der Übersetzung zu.", "Datenschutzerklärung", "▶ Akzeptieren und starten",
    "■ Stoppen", "Bereit", "Verbindung zu {provider} wird hergestellt…", "Live-Übersetzung läuft", "Gestoppt", "Übersetzung gestoppt", "{count} Audiosegmente",
    "ORIGINAL", "ÜBERSETZUNG", "Dies ist eine unabhängige Drittanbieter-Erweiterung; sie wurde weder von Google noch von Alibaba entwickelt oder empfohlen.", "Alle lokalen Einstellungen und Sitzungsdaten löschen", "Akzeptieren Sie vor dem Start die Erklärung zur Datenübertragung.", "Kein aktiver Tab gefunden. Versuchen Sie es in einem normalen Web-Tab erneut.", "Die Verbindungsberechtigung für den gewählten API-Host wurde nicht erteilt. Bestätigen Sie die Berechtigungsabfrage und versuchen Sie es erneut.",
    "Geben Sie einen gültigen {provider}-API-Schlüssel ein.", "Die Modell- oder Spracheinstellung ist ungültig. Prüfen Sie Ihre Auswahl.", "Die Basis-URL ist ungültig. Geben Sie eine vollständige HTTPS- oder WSS-Adresse ohne Zugangsdaten oder #-Fragment ein.", "Der Tab-Ton konnte nicht erfasst oder die Audioverarbeitung nicht gestartet werden. Starten Sie das Video und versuchen Sie es erneut.", "Die API-Verbindung konnte nicht hergestellt werden oder wurde unterbrochen. Prüfen Sie Basis-URL, Netzwerk und Anbieterstatus.", "Ein unerwarteter Fehler ist aufgetreten. Versuchen Sie es erneut.", "Der API-Dienst hat folgende Meldung zurückgegeben: {message}"
  ],
  fr: [
    "Traduction vocale en direct YouTube", "traduction audio en temps réel", "traduction en temps réel", "Modèle de traduction", "Clé API {provider}", "Clé API {service}", "La clé est conservée uniquement en mémoire pendant cette session du navigateur et sert à la connexion {provider}.",
    "Afficher", "Masquer", "Afficher/masquer la clé", "URL de base {provider}", "Saisissez une adresse Google AI Studio/API Gemini ou un point de terminaison HTTPS/WSS personnalisé compatible avec Gemini Live.", "Saisissez une adresse QwenCloud ou d’espace de travail Alibaba Singapour, ou un point de terminaison HTTPS/WSS compatible avec Qwen Realtime.", "Enregistré sur cet appareil.",
    "Enregistrement…", "Enregistré.", "Échec de l’enregistrement.", "Langue source", "Langue cible", "Détectée automatiquement (Gemini)", "La langue cible choisie ne prend en charge que le texte dans Qwen ; aucun son traduit ne sera lu.",
    "Audio original", "Audio traduit", "Utilisation des données", "Au démarrage, l’audio de l’onglet sélectionné et les transcriptions générées sont envoyés au service API de l’URL de base saisie pour la traduction en temps réel. Les services par défaut sont Google Gemini et Alibaba/QwenCloud. Votre clé API sert uniquement à vous authentifier auprès de l’hôte API choisi. Aucune donnée n’est envoyée au serveur du développeur.", "Je comprends ce transfert de données et j’accepte de démarrer la traduction.", "Politique de confidentialité", "▶ Accepter et démarrer",
    "■ Arrêter", "Prêt", "Connexion à {provider}…", "La traduction en direct est active", "Arrêté", "Traduction arrêtée", "{count} segments audio",
    "ORIGINAL", "TRADUCTION", "Cette extension tierce est indépendante ; elle n’est ni développée ni approuvée par Google ou Alibaba.", "Supprimer tous les réglages locaux et les données de session", "Acceptez l’avis de transfert des données avant de démarrer.", "Aucun onglet actif trouvé. Réessayez dans un onglet Web normal.", "L’autorisation de connexion à l’hôte API choisi n’a pas été accordée. Acceptez la demande d’autorisation et réessayez.",
    "Saisissez une clé API {provider} valide.", "Le modèle ou la langue sélectionnée n’est pas valide. Vérifiez vos choix.", "L’URL de base n’est pas valide. Saisissez une adresse HTTPS ou WSS complète, sans identifiants ni fragment #.", "Impossible de capturer l’audio de l’onglet ou de démarrer le traitement audio. Lancez la vidéo et réessayez.", "La connexion API n’a pas pu être établie ou a été interrompue. Vérifiez l’URL de base, le réseau et l’état du fournisseur.", "Une erreur inattendue s’est produite. Réessayez.", "Le service API a renvoyé ce message : {message}"
  ],
  es: [
    "Traducción de voz en vivo de Youtube", "traducción de audio en tiempo real", "traducción en tiempo real", "Modelo de traducción", "Clave API de {provider}", "Clave API de {service}", "La clave se conserva solo en la memoria de esta sesión del navegador y se usa para la conexión con {provider}.",
    "Mostrar", "Ocultar", "Mostrar/ocultar clave", "URL base de {provider}", "Introduce una dirección de Google AI Studio/API de Gemini o un endpoint HTTPS/WSS personalizado compatible con Gemini Live.", "Introduce una dirección de QwenCloud o de un espacio de trabajo de Alibaba Singapur, o un endpoint HTTPS/WSS compatible con Qwen Realtime.", "Guardado en este dispositivo.",
    "Guardando…", "Guardado.", "No se pudo guardar.", "Idioma de origen", "Idioma de destino", "Detección automática (Gemini)", "El idioma de destino seleccionado solo admite salida de texto en Qwen; no se reproducirá audio traducido.",
    "Audio original", "Audio traducido", "Uso de datos", "Al iniciar, el audio de la pestaña seleccionada y las transcripciones generadas se envían al servicio API de la URL base introducida para su traducción en tiempo real. Los servicios predeterminados son Google Gemini y Alibaba/QwenCloud. Tu clave API solo se usa para autenticarte con el host de API elegido. No se envían datos al servidor del desarrollador.", "Entiendo esta transferencia de datos y acepto iniciar la traducción.", "Política de privacidad", "▶ Aceptar e iniciar",
    "■ Detener", "Listo", "Conectando con {provider}…", "La traducción en directo está activa", "Detenido", "Traducción detenida", "{count} fragmentos de audio",
    "ORIGINAL", "TRADUCCIÓN", "Esta es una extensión independiente de terceros; no está desarrollada ni respaldada por Google o Alibaba.", "Eliminar todos los ajustes locales y datos de sesión", "Acepta el aviso de transferencia de datos antes de iniciar.", "No se encontró ninguna pestaña activa. Inténtalo de nuevo en una pestaña web normal.", "No se concedió permiso para conectar con el host de API elegido. Acepta la solicitud de permiso e inténtalo de nuevo.",
    "Introduce una clave API de {provider} válida.", "El modelo o el idioma seleccionado no es válido. Revisa tus opciones.", "La URL base no es válida. Introduce una dirección HTTPS o WSS completa sin credenciales ni fragmento #.", "No se pudo capturar el audio de la pestaña o iniciar el procesador de audio. Reproduce el vídeo e inténtalo de nuevo.", "No se pudo establecer la conexión API o se interrumpió. Comprueba la URL base, la red y el estado del proveedor.", "Se produjo un error inesperado. Inténtalo de nuevo.", "El servicio API devolvió este mensaje: {message}"
  ],
  it: [
    "Traduzione vocale in diretta YouTube", "traduzione audio in tempo reale", "traduzione in tempo reale", "Modello di traduzione", "Chiave API {provider}", "Chiave API {service}", "La chiave resta solo nella memoria di questa sessione del browser e viene usata per la connessione {provider}.",
    "Mostra", "Nascondi", "Mostra/nascondi chiave", "URL base {provider}", "Inserisci un indirizzo Google AI Studio/API Gemini o un endpoint HTTPS/WSS personalizzato compatibile con Gemini Live.", "Inserisci un indirizzo QwenCloud o workspace Alibaba Singapore, oppure un endpoint HTTPS/WSS compatibile con Qwen Realtime.", "Salvato su questo dispositivo.",
    "Salvataggio…", "Salvato.", "Salvataggio non riuscito.", "Lingua di origine", "Lingua di destinazione", "Rilevata automaticamente (Gemini)", "La lingua di destinazione selezionata supporta solo l’output testuale in Qwen; l’audio tradotto non verrà riprodotto.",
    "Audio originale", "Audio tradotto", "Utilizzo dei dati", "All’avvio, l’audio della scheda selezionata e le trascrizioni generate vengono inviati al servizio API dell’URL base inserito per la traduzione in tempo reale. I servizi predefiniti sono Google Gemini e Alibaba/QwenCloud. La chiave API viene usata solo per autenticarsi con l’host API scelto. Nessun dato viene inviato al server dello sviluppatore.", "Comprendo questo trasferimento di dati e accetto di avviare la traduzione.", "Informativa sulla privacy", "▶ Accetta e avvia",
    "■ Interrompi", "Pronto", "Connessione a {provider}…", "La traduzione in diretta è attiva", "Interrotto", "Traduzione interrotta", "{count} segmenti audio",
    "ORIGINALE", "TRADUZIONE", "Questa è un’estensione indipendente di terze parti; non è sviluppata né approvata da Google o Alibaba.", "Elimina tutte le impostazioni locali e i dati di sessione", "Accetta l’informativa sul trasferimento dei dati prima di iniziare.", "Nessuna scheda attiva trovata. Riprova in una normale scheda web.", "L’autorizzazione a connettersi all’host API scelto non è stata concessa. Approva la richiesta e riprova.",
    "Inserisci una chiave API {provider} valida.", "L’impostazione del modello o della lingua non è valida. Controlla le selezioni.", "L’URL base non è valido. Inserisci un indirizzo HTTPS o WSS completo, senza credenziali o frammento #.", "Impossibile acquisire l’audio della scheda o avviare il processore audio. Riproduci il video e riprova.", "Impossibile stabilire la connessione API oppure la connessione è stata interrotta. Controlla URL base, rete e stato del provider.", "Si è verificato un errore imprevisto. Riprova.", "Il servizio API ha restituito questo messaggio: {message}"
  ],
  pt: [
    "Tradução de voz ao vivo do YouTube", "tradução de áudio em tempo real", "tradução em tempo real", "Modelo de tradução", "Chave da API {provider}", "Chave da API {service}", "A chave é mantida apenas na memória desta sessão do navegador e usada na ligação ao {provider}.",
    "Mostrar", "Ocultar", "Mostrar/ocultar chave", "URL base do {provider}", "Introduza um endereço do Google AI Studio/API Gemini ou um endpoint HTTPS/WSS personalizado compatível com Gemini Live.", "Introduza um endereço QwenCloud ou de workspace Alibaba Singapura, ou um endpoint HTTPS/WSS compatível com Qwen Realtime.", "Guardado neste dispositivo.",
    "A guardar…", "Guardado.", "Não foi possível guardar.", "Idioma de origem", "Idioma de destino", "Detetado automaticamente (Gemini)", "O idioma de destino selecionado suporta apenas texto no Qwen; o áudio traduzido não será reproduzido.",
    "Áudio original", "Áudio traduzido", "Utilização de dados", "Ao iniciar, o áudio do separador selecionado e as transcrições geradas são enviados para o serviço API do URL base introduzido para tradução em tempo real. Os serviços predefinidos são Google Gemini e Alibaba/QwenCloud. A sua chave API é usada apenas para autenticação no host API escolhido. Nenhum dado é enviado para o servidor do programador.", "Compreendo esta transferência de dados e aceito iniciar a tradução.", "Política de privacidade", "▶ Aceitar e iniciar",
    "■ Parar", "Pronto", "A ligar ao {provider}…", "A tradução em direto está ativa", "Parado", "Tradução parada", "{count} segmentos de áudio",
    "ORIGINAL", "TRADUÇÃO", "Esta é uma extensão independente de terceiros; não foi desenvolvida nem aprovada pela Google ou Alibaba.", "Eliminar todas as definições locais e dados da sessão", "Aceite o aviso de transferência de dados antes de iniciar.", "Não foi encontrado um separador ativo. Tente novamente num separador Web normal.", "A permissão para ligar ao host API escolhido não foi concedida. Aprove o pedido de permissão e tente novamente.",
    "Introduza uma chave API {provider} válida.", "A definição do modelo ou idioma é inválida. Verifique as suas seleções.", "O URL base é inválido. Introduza um endereço HTTPS ou WSS completo, sem credenciais nem fragmento #.", "Não foi possível capturar o áudio do separador ou iniciar o processador de áudio. Reproduza o vídeo e tente novamente.", "Não foi possível estabelecer a ligação API ou esta foi interrompida. Verifique o URL base, a rede e o estado do fornecedor.", "Ocorreu um erro inesperado. Tente novamente.", "O serviço API devolveu esta mensagem: {message}"
  ],
  nl: [
    "Youtube Live Voice Vertaling", "realtime audiovertaling", "realtime vertaling", "Vertaalmodel", "{provider}-API-sleutel", "API-sleutel voor {service}", "De sleutel wordt alleen in het geheugen van deze browsersessie bewaard en gebruikt voor de {provider}-verbinding.",
    "Tonen", "Verbergen", "Sleutel tonen/verbergen", "{provider}-basis-URL", "Voer een Google AI Studio/Gemini API-adres of een aangepaste HTTPS/WSS-endpoint in die compatibel is met Gemini Live.", "Voer een QwenCloud- of Alibaba Singapore-workspaceadres in, of een HTTPS/WSS-endpoint die compatibel is met Qwen Realtime.", "Op dit apparaat opgeslagen.",
    "Opslaan…", "Opgeslagen.", "Opslaan mislukt.", "Brontaal", "Doeltaal", "Automatisch gedetecteerd (Gemini)", "De gekozen doeltaal ondersteunt in Qwen alleen tekst; vertaalde audio wordt niet afgespeeld.",
    "Originele audio", "Vertaalde audio", "Gegevensgebruik", "Bij het starten worden de audio van het geselecteerde tabblad en de gemaakte transcripties voor realtime vertaling verzonden naar de API-service op de ingevoerde basis-URL. De standaardservices zijn Google Gemini en Alibaba/QwenCloud. Uw API-sleutel wordt alleen gebruikt voor verificatie bij de gekozen API-host. Er worden geen gegevens naar de server van de ontwikkelaar gestuurd.", "Ik begrijp deze gegevensoverdracht en ga akkoord met het starten van de vertaling.", "Privacybeleid", "▶ Accepteren en starten",
    "■ Stoppen", "Gereed", "Verbinden met {provider}…", "Livevertaling is actief", "Gestopt", "Vertaling gestopt", "{count} audiofragmenten",
    "ORIGINEEL", "VERTALING", "Dit is een onafhankelijke extensie van een derde partij; deze is niet ontwikkeld of goedgekeurd door Google of Alibaba.", "Alle lokale instellingen en sessiegegevens verwijderen", "Accepteer vóór het starten de uitleg over gegevensoverdracht.", "Er is geen actief tabblad gevonden. Probeer het opnieuw in een normaal webtabblad.", "Toestemming om met de gekozen API-host te verbinden is niet verleend. Keur het toestemmingsvenster goed en probeer opnieuw.",
    "Voer een geldige {provider}-API-sleutel in.", "De model- of taalinstelling is ongeldig. Controleer uw keuzes.", "De basis-URL is ongeldig. Voer een volledig HTTPS- of WSS-adres in zonder inloggegevens of #-fragment.", "De tabbladaudio kon niet worden vastgelegd of de audioverwerker kon niet starten. Speel de video af en probeer opnieuw.", "De API-verbinding kon niet worden gemaakt of werd onderbroken. Controleer de basis-URL, het netwerk en de providerstatus.", "Er is een onverwachte fout opgetreden. Probeer opnieuw.", "De API-service gaf dit bericht terug: {message}"
  ],
  pl: [
    "Tłumaczenie głosowe na żywo — Youtube", "tłumaczenie dźwięku w czasie rzeczywistym", "tłumaczenie w czasie rzeczywistym", "Model tłumaczenia", "Klucz API {provider}", "Klucz API {service}", "Klucz jest przechowywany wyłącznie w pamięci tej sesji przeglądarki i używany do połączenia z {provider}.",
    "Pokaż", "Ukryj", "Pokaż/ukryj klucz", "Bazowy URL {provider}", "Wpisz adres Google AI Studio/API Gemini lub niestandardowy punkt HTTPS/WSS zgodny z Gemini Live.", "Wpisz adres QwenCloud lub obszaru roboczego Alibaba Singapur albo punkt HTTPS/WSS zgodny z Qwen Realtime.", "Zapisano na tym urządzeniu.",
    "Zapisywanie…", "Zapisano.", "Nie udało się zapisać.", "Język źródłowy", "Język docelowy", "Wykrywany automatycznie (Gemini)", "Wybrany język docelowy obsługuje w Qwen tylko tekst; przetłumaczony dźwięk nie zostanie odtworzony.",
    "Oryginalny dźwięk", "Przetłumaczony dźwięk", "Wykorzystanie danych", "Po uruchomieniu dźwięk z wybranej karty i utworzone transkrypcje są wysyłane do usługi API pod wpisanym bazowym URL-em w celu tłumaczenia w czasie rzeczywistym. Domyślne usługi to Google Gemini i Alibaba/QwenCloud. Klucz API służy wyłącznie do uwierzytelnienia na wybranym hoście API. Żadne dane nie trafiają na serwer twórcy.", "Rozumiem ten transfer danych i zgadzam się na rozpoczęcie tłumaczenia.", "Polityka prywatności", "▶ Zaakceptuj i uruchom",
    "■ Zatrzymaj", "Gotowe", "Łączenie z {provider}…", "Tłumaczenie na żywo działa", "Zatrzymano", "Tłumaczenie zatrzymane", "{count} fragmentów audio",
    "ORYGINAŁ", "TŁUMACZENIE", "To niezależne rozszerzenie innej firmy; nie zostało opracowane ani zatwierdzone przez Google lub Alibaba.", "Usuń wszystkie ustawienia lokalne i dane sesji", "Przed rozpoczęciem zaakceptuj informację o transferze danych.", "Nie znaleziono aktywnej karty. Spróbuj ponownie na zwykłej karcie internetowej.", "Nie udzielono zgody na połączenie z wybranym hostem API. Zatwierdź monit o uprawnienie i spróbuj ponownie.",
    "Wpisz prawidłowy klucz API {provider}.", "Ustawienie modelu lub języka jest nieprawidłowe. Sprawdź wybór.", "Bazowy URL jest nieprawidłowy. Wpisz pełny adres HTTPS lub WSS bez danych logowania i fragmentu #.", "Nie udało się przechwycić dźwięku karty lub uruchomić procesora audio. Odtwórz film i spróbuj ponownie.", "Nie udało się nawiązać połączenia API lub zostało ono przerwane. Sprawdź bazowy URL, sieć i stan dostawcy.", "Wystąpił nieoczekiwany błąd. Spróbuj ponownie.", "Usługa API zwróciła komunikat: {message}"
  ],
  ru: [
    "Живой перевод голоса — Youtube", "перевод аудио в реальном времени", "перевод в реальном времени", "Модель перевода", "API-ключ {provider}", "API-ключ {service}", "Ключ хранится только в памяти текущего сеанса браузера и используется для подключения к {provider}.",
    "Показать", "Скрыть", "Показать/скрыть ключ", "Базовый URL {provider}", "Введите адрес Google AI Studio/API Gemini или пользовательскую конечную точку HTTPS/WSS, совместимую с Gemini Live.", "Введите адрес QwenCloud или рабочей области Alibaba Singapore либо конечную точку HTTPS/WSS, совместимую с Qwen Realtime.", "Сохранено на этом устройстве.",
    "Сохранение…", "Сохранено.", "Не удалось сохранить.", "Исходный язык", "Язык перевода", "Определяется автоматически (Gemini)", "Для выбранного языка Qwen поддерживает только текст; переведённый звук воспроизводиться не будет.",
    "Исходный звук", "Переведённый звук", "Использование данных", "После запуска звук выбранной вкладки и созданные расшифровки отправляются для перевода в реальном времени в API-сервис по указанному базовому URL. По умолчанию используются Google Gemini и Alibaba/QwenCloud. API-ключ применяется только для аутентификации на выбранном API-хосте. Данные не отправляются на сервер разработчика.", "Я понимаю эту передачу данных и соглашаюсь начать перевод.", "Политика конфиденциальности", "▶ Принять и запустить",
    "■ Остановить", "Готово", "Подключение к {provider}…", "Перевод в реальном времени запущен", "Остановлено", "Перевод остановлен", "Аудиофрагментов: {count}",
    "ОРИГИНАЛ", "ПЕРЕВОД", "Это независимое стороннее расширение; оно не разработано и не одобрено Google или Alibaba.", "Удалить все локальные настройки и данные сеанса", "Перед запуском примите уведомление о передаче данных.", "Активная вкладка не найдена. Повторите попытку на обычной веб-вкладке.", "Разрешение на подключение к выбранному API-хосту не предоставлено. Подтвердите запрос разрешения и повторите попытку.",
    "Введите действительный API-ключ {provider}.", "Недопустимая настройка модели или языка. Проверьте выбранные параметры.", "Недопустимый базовый URL. Введите полный адрес HTTPS или WSS без учётных данных и фрагмента #.", "Не удалось захватить звук вкладки или запустить обработчик аудио. Включите видео и повторите попытку.", "Не удалось установить API-соединение либо оно было прервано. Проверьте базовый URL, сеть и состояние провайдера.", "Произошла непредвиденная ошибка. Повторите попытку.", "API-сервис вернул сообщение: {message}"
  ],
  uk: [
    "Живий переклад голосу — Youtube", "переклад аудіо в реальному часі", "переклад у реальному часі", "Модель перекладу", "API-ключ {provider}", "API-ключ {service}", "Ключ зберігається лише в пам’яті цього сеансу браузера та використовується для з’єднання з {provider}.",
    "Показати", "Сховати", "Показати/сховати ключ", "Базова URL-адреса {provider}", "Введіть адресу Google AI Studio/API Gemini або власну кінцеву точку HTTPS/WSS, сумісну з Gemini Live.", "Введіть адресу QwenCloud чи робочого простору Alibaba Singapore або кінцеву точку HTTPS/WSS, сумісну з Qwen Realtime.", "Збережено на цьому пристрої.",
    "Збереження…", "Збережено.", "Не вдалося зберегти.", "Мова оригіналу", "Мова перекладу", "Визначається автоматично (Gemini)", "Для вибраної мови Qwen підтримує лише текст; перекладене аудіо не відтворюватиметься.",
    "Оригінальний звук", "Перекладений звук", "Використання даних", "Після запуску звук вибраної вкладки та створені транскрипти надсилаються для перекладу в реальному часі до API-сервісу за введеною базовою URL-адресою. Типові сервіси — Google Gemini та Alibaba/QwenCloud. API-ключ використовується лише для автентифікації на вибраному API-хості. Дані не надсилаються на сервер розробника.", "Я розумію цю передачу даних і погоджуюся почати переклад.", "Політика конфіденційності", "▶ Прийняти й запустити",
    "■ Зупинити", "Готово", "З’єднання з {provider}…", "Переклад наживо працює", "Зупинено", "Переклад зупинено", "Аудіофрагментів: {count}",
    "ОРИГІНАЛ", "ПЕРЕКЛАД", "Це незалежне стороннє розширення; його не розробляли й не схвалювали Google або Alibaba.", "Видалити всі локальні налаштування та дані сеансу", "Перед запуском прийміть повідомлення про передачу даних.", "Активну вкладку не знайдено. Спробуйте ще раз на звичайній вебвкладці.", "Дозвіл на з’єднання з вибраним API-хостом не надано. Підтвердьте запит дозволу та повторіть спробу.",
    "Введіть дійсний API-ключ {provider}.", "Неприпустиме налаштування моделі або мови. Перевірте вибрані параметри.", "Базова URL-адреса недійсна. Введіть повну адресу HTTPS або WSS без облікових даних і фрагмента #.", "Не вдалося захопити звук вкладки або запустити обробник аудіо. Увімкніть відео та повторіть спробу.", "Не вдалося встановити API-з’єднання або його було перервано. Перевірте базову URL-адресу, мережу та стан провайдера.", "Сталася неочікувана помилка. Повторіть спробу.", "API-сервіс повернув повідомлення: {message}"
  ],
  ar: [
    "الترجمة الصوتية المباشرة ليوتيوب", "ترجمة صوتية فورية", "ترجمة فورية", "نموذج الترجمة", "مفتاح API لـ {provider}", "مفتاح API لخدمة {service}", "يُحفظ المفتاح في ذاكرة جلسة المتصفح الحالية فقط ويُستخدم لاتصال {provider}.",
    "إظهار", "إخفاء", "إظهار/إخفاء المفتاح", "عنوان Base URL لـ {provider}", "أدخل عنوان Google AI Studio/Gemini API أو نقطة HTTPS/WSS مخصصة متوافقة مع Gemini Live.", "أدخل عنوان QwenCloud أو مساحة عمل Alibaba في سنغافورة، أو نقطة HTTPS/WSS مخصصة متوافقة مع Qwen Realtime.", "محفوظ على هذا الجهاز.",
    "جارٍ الحفظ…", "تم الحفظ.", "تعذّر الحفظ.", "لغة المصدر", "اللغة الهدف", "اكتشاف تلقائي (Gemini)", "اللغة الهدف المحددة تدعم النص فقط في Qwen؛ لن يتم تشغيل الصوت المترجم.",
    "الصوت الأصلي", "الصوت المترجم", "استخدام البيانات", "عند البدء، يُرسل صوت علامة التبويب المحددة والنصوص الناتجة إلى خدمة API الموجودة في عنوان Base URL الذي أدخلته لإجراء الترجمة الفورية. الخدمتان الافتراضيتان هما Google Gemini وAlibaba/QwenCloud. يُستخدم مفتاح API فقط للمصادقة لدى مضيف API الذي اخترته. لا تُرسل أي بيانات إلى خادم المطوّر.", "أفهم نقل هذه البيانات وأوافق على بدء الترجمة.", "سياسة الخصوصية", "▶ موافقة وبدء",
    "■ إيقاف", "جاهز", "جارٍ الاتصال بـ {provider}…", "الترجمة المباشرة قيد التشغيل", "تم الإيقاف", "توقفت الترجمة", "{count} مقاطع صوتية",
    "الأصل", "الترجمة", "هذه إضافة مستقلة من جهة خارجية؛ لم تطورها Google أو Alibaba ولم تصادقا عليها.", "حذف جميع الإعدادات المحلية وبيانات الجلسة", "وافق على إشعار نقل البيانات قبل البدء.", "لم يتم العثور على علامة تبويب نشطة. أعد المحاولة في علامة ويب عادية.", "لم يُمنح إذن الاتصال بمضيف API المحدد. وافق على طلب الإذن ثم أعد المحاولة.",
    "أدخل مفتاح API صالحًا لـ {provider}.", "إعداد النموذج أو اللغة غير صالح. تحقّق من اختياراتك.", "عنوان Base URL غير صالح. أدخل عنوان HTTPS أو WSS كاملًا من دون بيانات اعتماد أو جزء #.", "تعذّر التقاط صوت علامة التبويب أو تشغيل معالج الصوت. شغّل الفيديو ثم أعد المحاولة.", "تعذّر إنشاء اتصال API أو انقطع. تحقّق من Base URL والشبكة وحالة المزوّد.", "حدث خطأ غير متوقع. أعد المحاولة.", "أعادت خدمة API الرسالة التالية: {message}"
  ],
  fa: [
    "ترجمهٔ زندهٔ صدا برای یوتیوب", "ترجمهٔ صوتی هم‌زمان", "ترجمهٔ هم‌زمان", "مدل ترجمه", "کلید API ‏{provider}", "کلید API ‏{service}", "کلید فقط در حافظهٔ همین نشست مرورگر نگه‌داری می‌شود و برای اتصال {provider} به کار می‌رود.",
    "نمایش", "پنهان کردن", "نمایش/پنهان کردن کلید", "Base URL ‏{provider}", "نشانی Google AI Studio/Gemini API یا یک نقطهٔ پایانی HTTPS/WSS سازگار با Gemini Live وارد کنید.", "نشانی QwenCloud یا فضای کاری Alibaba سنگاپور، یا یک نقطهٔ پایانی HTTPS/WSS سازگار با Qwen Realtime وارد کنید.", "در این دستگاه ذخیره می‌شود.",
    "در حال ذخیره…", "ذخیره شد.", "ذخیره نشد.", "زبان مبدأ", "زبان مقصد", "تشخیص خودکار (Gemini)", "زبان مقصد انتخاب‌شده در Qwen فقط خروجی متنی دارد؛ صدای ترجمه‌شده پخش نمی‌شود.",
    "صدای اصلی", "صدای ترجمه‌شده", "استفاده از داده", "با شروع کار، صدای برگهٔ انتخاب‌شده و رونوشت‌های تولیدشده برای ترجمهٔ هم‌زمان به سرویس API در Base URL واردشده فرستاده می‌شوند. سرویس‌های پیش‌فرض Google Gemini و Alibaba/QwenCloud هستند. کلید API فقط برای احراز هویت در میزبان API انتخابی استفاده می‌شود. هیچ داده‌ای به سرور توسعه‌دهنده ارسال نمی‌شود.", "این انتقال داده را درک می‌کنم و با شروع ترجمه موافقم.", "سیاست حریم خصوصی", "▶ پذیرش و شروع",
    "■ توقف", "آماده", "در حال اتصال به {provider}…", "ترجمهٔ زنده در حال اجراست", "متوقف شد", "ترجمه متوقف شد", "{count} قطعهٔ صوتی",
    "اصلی", "ترجمه", "این یک افزونهٔ مستقل شخص ثالث است و توسط Google یا Alibaba توسعه یا تأیید نشده است.", "حذف همهٔ تنظیمات محلی و داده‌های نشست", "پیش از شروع، توضیح انتقال داده را بپذیرید.", "برگهٔ فعالی پیدا نشد. در یک برگهٔ وب عادی دوباره تلاش کنید.", "مجوز اتصال به میزبان API انتخابی داده نشد. درخواست مجوز را تأیید و دوباره تلاش کنید.",
    "یک کلید API معتبر برای {provider} وارد کنید.", "تنظیم مدل یا زبان نامعتبر است. انتخاب‌ها را بررسی کنید.", "Base URL نامعتبر است. نشانی کامل HTTPS یا WSS را بدون اطلاعات ورود یا بخش # وارد کنید.", "صدای برگه ضبط نشد یا پردازشگر صدا آغاز نشد. ویدئو را پخش و دوباره تلاش کنید.", "اتصال API برقرار نشد یا قطع شد. Base URL، شبکه و وضعیت ارائه‌دهنده را بررسی کنید.", "خطای پیش‌بینی‌نشده‌ای رخ داد. دوباره تلاش کنید.", "سرویس API این پیام را برگرداند: {message}"
  ],
  hi: [
    "यूट्यूब लाइव वॉइस अनुवाद", "रीयल-टाइम ऑडियो अनुवाद", "रीयल-टाइम अनुवाद", "अनुवाद मॉडल", "{provider} API कुंजी", "{service} API कुंजी", "कुंजी केवल इस ब्राउज़र सत्र की मेमोरी में रखी जाती है और {provider} कनेक्शन के लिए उपयोग होती है।",
    "दिखाएँ", "छिपाएँ", "कुंजी दिखाएँ/छिपाएँ", "{provider} Base URL", "Google AI Studio/Gemini API पता या Gemini Live के अनुकूल कस्टम HTTPS/WSS एंडपॉइंट दर्ज करें।", "QwenCloud या Alibaba Singapore वर्कस्पेस पता, या Qwen Realtime के अनुकूल कस्टम HTTPS/WSS एंडपॉइंट दर्ज करें।", "इस डिवाइस पर सहेजा जाता है।",
    "सहेजा जा रहा है…", "सहेजा गया।", "सहेजा नहीं जा सका।", "स्रोत भाषा", "लक्ष्य भाषा", "स्वचालित पहचान (Gemini)", "चुनी गई लक्ष्य भाषा Qwen में केवल टेक्स्ट आउटपुट देती है; अनुवादित ऑडियो नहीं चलेगा।",
    "मूल ऑडियो", "अनुवादित ऑडियो", "डेटा का उपयोग", "शुरू करने पर चुने गए टैब का ऑडियो और बने ट्रांसक्रिप्ट रीयल-टाइम अनुवाद के लिए आपके दर्ज किए Base URL वाली API सेवा को भेजे जाते हैं। डिफ़ॉल्ट सेवाएँ Google Gemini और Alibaba/QwenCloud हैं। आपकी API कुंजी केवल चुने हुए API होस्ट पर प्रमाणीकरण के लिए उपयोग होती है। डेवलपर के सर्वर को कोई डेटा नहीं भेजा जाता।", "मैं इस डेटा ट्रांसफ़र को समझता/समझती हूँ और अनुवाद शुरू करने के लिए सहमत हूँ।", "गोपनीयता नीति", "▶ स्वीकार करें और शुरू करें",
    "■ रोकें", "तैयार", "{provider} से कनेक्ट हो रहा है…", "लाइव अनुवाद चल रहा है", "रोका गया", "अनुवाद रुक गया", "{count} ऑडियो खंड",
    "मूल", "अनुवाद", "यह एक स्वतंत्र तृतीय-पक्ष एक्सटेंशन है; इसे Google या Alibaba ने विकसित या अनुमोदित नहीं किया है।", "सभी स्थानीय सेटिंग और सत्र डेटा मिटाएँ", "शुरू करने से पहले डेटा ट्रांसफ़र सूचना स्वीकार करें।", "कोई सक्रिय टैब नहीं मिला। सामान्य वेब टैब पर फिर प्रयास करें।", "चुने गए API होस्ट से कनेक्ट करने की अनुमति नहीं मिली। अनुमति अनुरोध स्वीकार करके फिर प्रयास करें।",
    "मान्य {provider} API कुंजी दर्ज करें।", "मॉडल या भाषा सेटिंग अमान्य है। अपने चयन जाँचें।", "Base URL अमान्य है। क्रेडेंशियल या # अंश के बिना पूरा HTTPS या WSS पता दर्ज करें।", "टैब ऑडियो कैप्चर नहीं हुआ या ऑडियो प्रोसेसर शुरू नहीं हो सका। वीडियो चलाकर फिर प्रयास करें।", "API कनेक्शन नहीं बन सका या टूट गया। Base URL, नेटवर्क और प्रदाता की स्थिति जाँचें।", "अनपेक्षित त्रुटि हुई। फिर प्रयास करें।", "API सेवा ने यह संदेश दिया: {message}"
  ],
  bn: [
    "ইউটিউব লাইভ ভয়েস অনুবাদ", "রিয়েল-টাইম অডিও অনুবাদ", "রিয়েল-টাইম অনুবাদ", "অনুবাদ মডেল", "{provider} API কী", "{service} API কী", "কীটি শুধু এই ব্রাউজার সেশনের মেমরিতে থাকে এবং {provider} সংযোগে ব্যবহৃত হয়।",
    "দেখান", "লুকান", "কী দেখান/লুকান", "{provider} Base URL", "Google AI Studio/Gemini API ঠিকানা অথবা Gemini Live-সামঞ্জস্যপূর্ণ কাস্টম HTTPS/WSS এন্ডপয়েন্ট লিখুন।", "QwenCloud বা Alibaba Singapore ওয়ার্কস্পেস ঠিকানা, অথবা Qwen Realtime-সামঞ্জস্যপূর্ণ কাস্টম HTTPS/WSS এন্ডপয়েন্ট লিখুন।", "এই ডিভাইসে সংরক্ষিত থাকে।",
    "সংরক্ষণ হচ্ছে…", "সংরক্ষিত।", "সংরক্ষণ করা যায়নি।", "উৎস ভাষা", "লক্ষ্য ভাষা", "স্বয়ংক্রিয়ভাবে শনাক্ত (Gemini)", "নির্বাচিত লক্ষ্য ভাষায় Qwen শুধু টেক্সট আউটপুট দেয়; অনূদিত অডিও বাজবে না।",
    "মূল অডিও", "অনূদিত অডিও", "ডেটা ব্যবহার", "শুরু করলে নির্বাচিত ট্যাবের অডিও ও তৈরি ট্রান্সক্রিপ্ট রিয়েল-টাইম অনুবাদের জন্য আপনার দেওয়া Base URL-এর API সেবায় পাঠানো হয়। ডিফল্ট সেবা হলো Google Gemini ও Alibaba/QwenCloud। আপনার API কী শুধু নির্বাচিত API হোস্টে প্রমাণীকরণের জন্য ব্যবহৃত হয়। ডেভেলপারের সার্ভারে কোনো ডেটা পাঠানো হয় না।", "আমি এই ডেটা স্থানান্তর বুঝেছি এবং অনুবাদ শুরু করতে সম্মত।", "গোপনীয়তা নীতি", "▶ সম্মতি দিয়ে শুরু করুন",
    "■ বন্ধ করুন", "প্রস্তুত", "{provider}-এ সংযোগ হচ্ছে…", "লাইভ অনুবাদ চলছে", "বন্ধ", "অনুবাদ বন্ধ হয়েছে", "{count}টি অডিও খণ্ড",
    "মূল", "অনুবাদ", "এটি একটি স্বাধীন তৃতীয়-পক্ষ এক্সটেনশন; Google বা Alibaba এটি তৈরি বা অনুমোদন করেনি।", "সব স্থানীয় সেটিংস ও সেশন ডেটা মুছুন", "শুরু করার আগে ডেটা স্থানান্তরের ঘোষণা গ্রহণ করুন।", "কোনো সক্রিয় ট্যাব পাওয়া যায়নি। সাধারণ ওয়েব ট্যাবে আবার চেষ্টা করুন।", "নির্বাচিত API হোস্টে সংযোগের অনুমতি দেওয়া হয়নি। অনুমতির অনুরোধ মঞ্জুর করে আবার চেষ্টা করুন।",
    "একটি বৈধ {provider} API কী লিখুন।", "মডেল বা ভাষার সেটিং অবৈধ। আপনার নির্বাচন পরীক্ষা করুন।", "Base URL অবৈধ। পরিচয়পত্র বা # অংশ ছাড়া পূর্ণ HTTPS বা WSS ঠিকানা লিখুন।", "ট্যাবের অডিও ধরা যায়নি বা অডিও প্রসেসর চালু হয়নি। ভিডিও চালিয়ে আবার চেষ্টা করুন।", "API সংযোগ স্থাপন করা যায়নি বা বিচ্ছিন্ন হয়েছে। Base URL, নেটওয়ার্ক ও প্রদানকারীর অবস্থা পরীক্ষা করুন।", "একটি অপ্রত্যাশিত ত্রুটি ঘটেছে। আবার চেষ্টা করুন।", "API সেবা এই বার্তা দিয়েছে: {message}"
  ],
  id: [
    "Terjemahan Suara Langsung Youtube", "terjemahan audio waktu nyata", "terjemahan waktu nyata", "Model terjemahan", "Kunci API {provider}", "Kunci API {service}", "Kunci hanya disimpan dalam memori sesi browser ini dan digunakan untuk koneksi {provider}.",
    "Tampilkan", "Sembunyikan", "Tampilkan/sembunyikan kunci", "Base URL {provider}", "Masukkan alamat Google AI Studio/API Gemini atau endpoint HTTPS/WSS khusus yang kompatibel dengan Gemini Live.", "Masukkan alamat QwenCloud atau workspace Alibaba Singapura, atau endpoint HTTPS/WSS yang kompatibel dengan Qwen Realtime.", "Disimpan di perangkat ini.",
    "Menyimpan…", "Tersimpan.", "Tidak dapat menyimpan.", "Bahasa sumber", "Bahasa target", "Terdeteksi otomatis (Gemini)", "Bahasa target yang dipilih hanya mendukung keluaran teks di Qwen; audio terjemahan tidak akan diputar.",
    "Audio asli", "Audio terjemahan", "Penggunaan data", "Saat dimulai, audio tab yang dipilih dan transkrip yang dihasilkan dikirim ke layanan API pada Base URL yang Anda masukkan untuk terjemahan waktu nyata. Layanan default adalah Google Gemini dan Alibaba/QwenCloud. Kunci API hanya digunakan untuk autentikasi ke host API pilihan Anda. Tidak ada data yang dikirim ke server pengembang.", "Saya memahami transfer data ini dan setuju untuk memulai terjemahan.", "Kebijakan Privasi", "▶ Setujui dan mulai",
    "■ Hentikan", "Siap", "Menghubungkan ke {provider}…", "Terjemahan langsung sedang berjalan", "Dihentikan", "Terjemahan berhenti", "{count} potongan audio",
    "ASLI", "TERJEMAHAN", "Ini adalah ekstensi pihak ketiga yang independen; tidak dikembangkan atau didukung oleh Google maupun Alibaba.", "Hapus semua setelan lokal dan data sesi", "Setujui pemberitahuan transfer data sebelum memulai.", "Tidak ada tab aktif. Coba lagi di tab web biasa.", "Izin koneksi ke host API yang dipilih tidak diberikan. Setujui permintaan izin lalu coba lagi.",
    "Masukkan kunci API {provider} yang valid.", "Setelan model atau bahasa tidak valid. Periksa pilihan Anda.", "Base URL tidak valid. Masukkan alamat HTTPS atau WSS lengkap tanpa kredensial atau fragmen #.", "Audio tab tidak dapat ditangkap atau pemroses audio tidak dapat dimulai. Putar video lalu coba lagi.", "Koneksi API tidak dapat dibuat atau terputus. Periksa Base URL, jaringan, dan status penyedia.", "Terjadi kesalahan yang tidak terduga. Coba lagi.", "Layanan API mengembalikan pesan ini: {message}"
  ],
  vi: [
    "Dịch giọng nói trực tiếp YouTube", "dịch âm thanh theo thời gian thực", "dịch theo thời gian thực", "Mô hình dịch", "Khóa API {provider}", "Khóa API {service}", "Khóa chỉ được giữ trong bộ nhớ của phiên trình duyệt này và dùng cho kết nối {provider}.",
    "Hiện", "Ẩn", "Hiện/ẩn khóa", "Base URL {provider}", "Nhập địa chỉ Google AI Studio/API Gemini hoặc điểm cuối HTTPS/WSS tùy chỉnh tương thích với Gemini Live.", "Nhập địa chỉ QwenCloud hoặc workspace Alibaba Singapore, hoặc điểm cuối HTTPS/WSS tương thích với Qwen Realtime.", "Được lưu trên thiết bị này.",
    "Đang lưu…", "Đã lưu.", "Không thể lưu.", "Ngôn ngữ nguồn", "Ngôn ngữ đích", "Tự động nhận diện (Gemini)", "Ngôn ngữ đích đã chọn chỉ hỗ trợ văn bản trong Qwen; âm thanh đã dịch sẽ không được phát.",
    "Âm thanh gốc", "Âm thanh đã dịch", "Sử dụng dữ liệu", "Khi bắt đầu, âm thanh của thẻ đã chọn và bản chép lời tạo ra được gửi đến dịch vụ API tại Base URL bạn nhập để dịch theo thời gian thực. Dịch vụ mặc định là Google Gemini và Alibaba/QwenCloud. Khóa API chỉ dùng để xác thực với máy chủ API bạn chọn. Không có dữ liệu nào được gửi đến máy chủ của nhà phát triển.", "Tôi hiểu việc truyền dữ liệu này và đồng ý bắt đầu dịch.", "Chính sách quyền riêng tư", "▶ Đồng ý và bắt đầu",
    "■ Dừng", "Sẵn sàng", "Đang kết nối với {provider}…", "Bản dịch trực tiếp đang chạy", "Đã dừng", "Bản dịch đã dừng", "{count} đoạn âm thanh",
    "BẢN GỐC", "BẢN DỊCH", "Đây là tiện ích độc lập của bên thứ ba; không do Google hoặc Alibaba phát triển hay chứng thực.", "Xóa mọi cài đặt cục bộ và dữ liệu phiên", "Hãy chấp nhận thông báo truyền dữ liệu trước khi bắt đầu.", "Không tìm thấy thẻ đang hoạt động. Hãy thử lại trong một thẻ web thông thường.", "Chưa cấp quyền kết nối với máy chủ API đã chọn. Hãy chấp nhận yêu cầu quyền rồi thử lại.",
    "Nhập khóa API {provider} hợp lệ.", "Cài đặt mô hình hoặc ngôn ngữ không hợp lệ. Hãy kiểm tra lựa chọn.", "Base URL không hợp lệ. Nhập địa chỉ HTTPS hoặc WSS đầy đủ, không có thông tin đăng nhập hay phần #.", "Không thể thu âm thanh của thẻ hoặc khởi động bộ xử lý âm thanh. Hãy phát video rồi thử lại.", "Không thể thiết lập kết nối API hoặc kết nối đã bị gián đoạn. Kiểm tra Base URL, mạng và trạng thái nhà cung cấp.", "Đã xảy ra lỗi không mong muốn. Hãy thử lại.", "Dịch vụ API trả về thông báo: {message}"
  ],
  th: [
    "แปลเสียงสด YouTube", "แปลเสียงแบบเรียลไทม์", "แปลแบบเรียลไทม์", "โมเดลแปลภาษา", "คีย์ API ของ {provider}", "คีย์ API ของ {service}", "คีย์จะถูกเก็บไว้เฉพาะในหน่วยความจำของเซสชันเบราว์เซอร์นี้ และใช้กับการเชื่อมต่อ {provider}",
    "แสดง", "ซ่อน", "แสดง/ซ่อนคีย์", "Base URL ของ {provider}", "ป้อนที่อยู่ Google AI Studio/Gemini API หรือปลายทาง HTTPS/WSS แบบกำหนดเองที่รองรับ Gemini Live", "ป้อนที่อยู่ QwenCloud หรือเวิร์กสเปซ Alibaba สิงคโปร์ หรือปลายทาง HTTPS/WSS ที่รองรับ Qwen Realtime", "จัดเก็บในอุปกรณ์นี้",
    "กำลังบันทึก…", "บันทึกแล้ว", "บันทึกไม่ได้", "ภาษาต้นทาง", "ภาษาเป้าหมาย", "ตรวจหาอัตโนมัติ (Gemini)", "ภาษาเป้าหมายที่เลือกใน Qwen รองรับเฉพาะข้อความ จึงจะไม่เล่นเสียงแปล",
    "เสียงต้นฉบับ", "เสียงแปล", "การใช้ข้อมูล", "เมื่อเริ่มทำงาน เสียงจากแท็บที่เลือกและข้อความถอดเสียงที่สร้างขึ้นจะถูกส่งไปยังบริการ API ที่ Base URL ซึ่งคุณป้อนเพื่อแปลแบบเรียลไทม์ บริการเริ่มต้นคือ Google Gemini และ Alibaba/QwenCloud คีย์ API ใช้เพื่อยืนยันตัวตนกับโฮสต์ API ที่คุณเลือกเท่านั้น ไม่มีข้อมูลส่งไปยังเซิร์ฟเวอร์ของผู้พัฒนา", "ฉันเข้าใจการส่งข้อมูลนี้และยินยอมให้เริ่มแปล", "นโยบายความเป็นส่วนตัว", "▶ ยอมรับและเริ่ม",
    "■ หยุด", "พร้อม", "กำลังเชื่อมต่อ {provider}…", "กำลังแปลสด", "หยุดแล้ว", "การแปลหยุดแล้ว", "เสียง {count} ส่วน",
    "ต้นฉบับ", "คำแปล", "นี่เป็นส่วนขยายอิสระของบุคคลที่สาม ไม่ได้พัฒนาหรือรับรองโดย Google หรือ Alibaba", "ลบการตั้งค่าภายในเครื่องและข้อมูลเซสชันทั้งหมด", "ยอมรับประกาศการส่งข้อมูลก่อนเริ่ม", "ไม่พบแท็บที่ใช้งานอยู่ โปรดลองอีกครั้งในแท็บเว็บปกติ", "ไม่ได้รับสิทธิ์เชื่อมต่อกับโฮสต์ API ที่เลือก โปรดยอมรับคำขอสิทธิ์แล้วลองอีกครั้ง",
    "ป้อนคีย์ API ของ {provider} ที่ถูกต้อง", "การตั้งค่าโมเดลหรือภาษาไม่ถูกต้อง โปรดตรวจสอบสิ่งที่เลือก", "Base URL ไม่ถูกต้อง ป้อนที่อยู่ HTTPS หรือ WSS แบบเต็มโดยไม่มีข้อมูลรับรองหรือส่วน #", "จับเสียงของแท็บหรือเริ่มตัวประมวลผลเสียงไม่ได้ โปรดเล่นวิดีโอแล้วลองอีกครั้ง", "สร้างการเชื่อมต่อ API ไม่ได้หรือการเชื่อมต่อถูกตัด ตรวจสอบ Base URL เครือข่าย และสถานะผู้ให้บริการ", "เกิดข้อผิดพลาดที่ไม่คาดคิด โปรดลองอีกครั้ง", "บริการ API ส่งข้อความนี้กลับมา: {message}"
  ],
  zh: [
    "YouTube 实时语音翻译", "实时音频翻译", "实时翻译", "翻译模型", "{provider} API 密钥", "{service} API 密钥", "密钥仅保存在本次浏览器会话的内存中，并用于连接 {provider}。",
    "显示", "隐藏", "显示/隐藏密钥", "{provider} Base URL", "请输入 Google AI Studio/Gemini API 地址，或兼容 Gemini Live 的自定义 HTTPS/WSS 端点。", "请输入 QwenCloud、阿里云新加坡工作空间地址，或兼容 Qwen Realtime 的自定义 HTTPS/WSS 端点。", "保存在此设备上。",
    "正在保存…", "已保存。", "无法保存。", "源语言", "目标语言", "自动检测（Gemini）", "所选目标语言在 Qwen 中仅支持文本输出；不会播放翻译后的音频。",
    "原始音频", "翻译音频", "数据使用", "开始后，所选标签页的音频和生成的转录文本会发送到您在 Base URL 中指定的 API 服务，以进行实时翻译。默认服务为 Google Gemini 和 Alibaba/QwenCloud。API 密钥仅用于向您选择的 API 主机进行身份验证。不会向开发者的服务器发送任何数据。", "我了解此数据传输，并同意开始翻译。", "隐私政策", "▶ 同意并开始",
    "■ 停止", "就绪", "正在连接 {provider}…", "实时翻译正在运行", "已停止", "翻译已停止", "{count} 个音频片段",
    "原文", "译文", "这是独立的第三方扩展程序；并非由 Google 或 Alibaba 开发或认可。", "删除所有本地设置和会话数据", "开始前请接受数据传输说明。", "未找到活动标签页。请在普通网页标签页中重试。", "未获得连接所选 API 主机的权限。请批准权限请求后重试。",
    "请输入有效的 {provider} API 密钥。", "模型或语言设置无效。请检查您的选择。", "Base URL 无效。请输入完整的 HTTPS 或 WSS 地址，不得包含凭据或 # 片段。", "无法捕获标签页音频或启动音频处理器。请播放视频后重试。", "无法建立 API 连接或连接已中断。请检查 Base URL、网络和服务商状态。", "发生意外错误。请重试。", "API 服务返回了以下消息：{message}"
  ],
  ja: [
    "YouTube ライブ音声翻訳", "リアルタイム音声翻訳", "リアルタイム翻訳", "翻訳モデル", "{provider} API キー", "{service} API キー", "キーはこのブラウザーセッションのメモリにのみ保持され、{provider} への接続に使用されます。",
    "表示", "非表示", "キーを表示／非表示", "{provider} Base URL", "Google AI Studio/Gemini API のアドレス、または Gemini Live 互換のカスタム HTTPS/WSS エンドポイントを入力してください。", "QwenCloud、Alibaba シンガポールのワークスペース、または Qwen Realtime 互換の HTTPS/WSS エンドポイントを入力してください。", "この端末に保存されます。",
    "保存中…", "保存しました。", "保存できませんでした。", "入力言語", "翻訳先言語", "自動検出（Gemini）", "選択した翻訳先言語は Qwen ではテキスト出力のみに対応しています。翻訳音声は再生されません。",
    "原音", "翻訳音声", "データの使用", "開始すると、選択したタブの音声と生成された文字起こしが、リアルタイム翻訳のために入力した Base URL の API サービスへ送信されます。既定のサービスは Google Gemini と Alibaba/QwenCloud です。API キーは選択した API ホストでの認証にのみ使用されます。開発者のサーバーへデータは送信されません。", "このデータ転送を理解し、翻訳の開始に同意します。", "プライバシーポリシー", "▶ 同意して開始",
    "■ 停止", "準備完了", "{provider} に接続中…", "ライブ翻訳を実行中", "停止しました", "翻訳を停止しました", "音声チャンク：{count}",
    "原文", "翻訳", "これは独立したサードパーティ製拡張機能であり、Google または Alibaba が開発・承認したものではありません。", "ローカル設定とセッションデータをすべて削除", "開始前にデータ転送の説明に同意してください。", "アクティブなタブが見つかりません。通常のウェブタブで再試行してください。", "選択した API ホストへの接続権限が許可されませんでした。権限の確認画面で許可してから再試行してください。",
    "有効な {provider} API キーを入力してください。", "モデルまたは言語の設定が無効です。選択内容を確認してください。", "Base URL が無効です。認証情報や # フラグメントを含まない完全な HTTPS または WSS アドレスを入力してください。", "タブの音声を取得できないか、音声処理を開始できませんでした。動画を再生して再試行してください。", "API 接続を確立できないか、接続が中断されました。Base URL、ネットワーク、プロバイダーの状態を確認してください。", "予期しないエラーが発生しました。再試行してください。", "API サービスから次のメッセージが返されました：{message}"
  ],
  ko: [
    "YouTube 실시간 음성 번역", "실시간 오디오 번역", "실시간 번역", "번역 모델", "{provider} API 키", "{service} API 키", "키는 이 브라우저 세션의 메모리에만 보관되며 {provider} 연결에 사용됩니다.",
    "표시", "숨기기", "키 표시/숨기기", "{provider} Base URL", "Google AI Studio/Gemini API 주소 또는 Gemini Live와 호환되는 맞춤 HTTPS/WSS 엔드포인트를 입력하세요.", "QwenCloud나 Alibaba 싱가포르 워크스페이스 주소 또는 Qwen Realtime과 호환되는 HTTPS/WSS 엔드포인트를 입력하세요.", "이 기기에 저장됩니다.",
    "저장 중…", "저장됨.", "저장할 수 없음.", "소스 언어", "대상 언어", "자동 감지(Gemini)", "선택한 대상 언어는 Qwen에서 텍스트 출력만 지원하므로 번역 음성이 재생되지 않습니다.",
    "원본 오디오", "번역 오디오", "데이터 사용", "시작하면 선택한 탭의 오디오와 생성된 텍스트가 실시간 번역을 위해 입력한 Base URL의 API 서비스로 전송됩니다. 기본 서비스는 Google Gemini와 Alibaba/QwenCloud입니다. API 키는 선택한 API 호스트의 인증에만 사용됩니다. 개발자의 서버로는 어떤 데이터도 전송되지 않습니다.", "이 데이터 전송을 이해했으며 번역 시작에 동의합니다.", "개인정보 처리방침", "▶ 동의하고 시작",
    "■ 중지", "준비됨", "{provider}에 연결 중…", "실시간 번역 실행 중", "중지됨", "번역이 중지됨", "오디오 청크 {count}개",
    "원본", "번역", "이 확장 프로그램은 독립적인 타사 제품이며 Google 또는 Alibaba가 개발하거나 보증하지 않았습니다.", "모든 로컬 설정 및 세션 데이터 삭제", "시작하기 전에 데이터 전송 안내에 동의하세요.", "활성 탭을 찾지 못했습니다. 일반 웹 탭에서 다시 시도하세요.", "선택한 API 호스트에 대한 연결 권한이 부여되지 않았습니다. 권한 요청을 승인한 뒤 다시 시도하세요.",
    "유효한 {provider} API 키를 입력하세요.", "모델 또는 언어 설정이 잘못되었습니다. 선택 내용을 확인하세요.", "Base URL이 잘못되었습니다. 자격 증명이나 # 조각 없이 완전한 HTTPS 또는 WSS 주소를 입력하세요.", "탭 오디오를 캡처하거나 오디오 프로세서를 시작할 수 없습니다. 비디오를 재생한 뒤 다시 시도하세요.", "API 연결을 설정할 수 없거나 연결이 끊겼습니다. Base URL, 네트워크 및 제공업체 상태를 확인하세요.", "예기치 않은 오류가 발생했습니다. 다시 시도하세요.", "API 서비스가 다음 메시지를 반환했습니다: {message}"
  ]
};

// Her iki sağlayıcı da sabit resmi endpoint kullanır; anahtarlar yalnız
// güvenilir uzantı bağlamlarının erişebildiği cihaz depolamasında tutulur.
const DATA_DISCLOSURES = {
  tr: "Başlattığınızda seçili sekmenin sesi ve oluşan transkriptler yalnızca seçtiğiniz çeviri API hizmetine gönderilir. Gemini sabit resmi Google Live API adresini, Qwen sabit Alibaba Cloud Singapur adresini kullanır. API anahtarları bu cihazda yalnız güvenilir uzantı bağlamlarının erişebildiği depolamada saklanır ve sadece ilgili hizmette kimlik doğrulaması için kullanılır. Geliştiricinin sunucusuna veri gönderilmez.",
  en: "When you start, the selected tab’s audio and generated transcripts are sent only to the translation API service you selected. Gemini uses the fixed official Google Live API endpoint, and Qwen uses the fixed Alibaba Cloud Singapore endpoint. API keys are stored on this device in storage accessible only to trusted extension contexts and are used only to authenticate with the relevant service. No data is sent to the developer’s server.",
  de: "Beim Start werden der Ton des ausgewählten Tabs und die erzeugten Transkripte nur an den gewählten Übersetzungs-API-Dienst gesendet. Gemini verwendet den festen offiziellen Google-Live-API-Endpunkt, Qwen den festen Alibaba-Cloud-Endpunkt in Singapur. API-Schlüssel werden auf diesem Gerät in einem nur für vertrauenswürdige Erweiterungskontexte zugänglichen Speicher abgelegt und nur zur Authentifizierung verwendet. An den Server des Entwicklers werden keine Daten gesendet.",
  fr: "Au démarrage, l’audio de l’onglet sélectionné et les transcriptions générées sont envoyés uniquement au service API de traduction choisi. Gemini utilise le point de terminaison officiel fixe de Google Live API et Qwen celui fixe d’Alibaba Cloud Singapour. Les clés API sont stockées sur cet appareil dans un espace accessible uniquement aux contextes fiables de l’extension et servent seulement à l’authentification. Aucune donnée n’est envoyée au serveur du développeur.",
  es: "Al iniciar, el audio de la pestaña seleccionada y las transcripciones generadas se envían únicamente al servicio API de traducción elegido. Gemini usa el endpoint oficial fijo de Google Live API y Qwen el endpoint fijo de Alibaba Cloud Singapur. Las claves API se guardan en este dispositivo en un almacenamiento accesible solo para contextos de confianza de la extensión y se usan únicamente para autenticarte. No se envían datos al servidor del desarrollador.",
  it: "All’avvio, l’audio della scheda selezionata e le trascrizioni generate vengono inviati solo al servizio API di traduzione scelto. Gemini usa l’endpoint ufficiale fisso di Google Live API e Qwen quello fisso di Alibaba Cloud Singapore. Le chiavi API sono salvate sul dispositivo in uno spazio accessibile solo ai contesti attendibili dell’estensione e vengono usate esclusivamente per l’autenticazione. Nessun dato viene inviato al server dello sviluppatore.",
  pt: "Ao iniciar, o áudio do separador selecionado e as transcrições geradas são enviados apenas para o serviço API de tradução escolhido. O Gemini usa o endpoint oficial fixo da Google Live API e o Qwen o endpoint fixo da Alibaba Cloud Singapura. As chaves API ficam guardadas neste dispositivo num armazenamento acessível apenas a contextos fidedignos da extensão e são usadas somente para autenticação. Nenhum dado é enviado para o servidor do programador.",
  nl: "Bij het starten worden de audio van het geselecteerde tabblad en de gemaakte transcripties alleen naar de gekozen vertaal-API gestuurd. Gemini gebruikt het vaste officiële Google Live API-eindpunt en Qwen het vaste Alibaba Cloud Singapore-eindpunt. API-sleutels worden op dit apparaat opgeslagen in opslag die alleen toegankelijk is voor vertrouwde extensiecontexten en uitsluitend voor verificatie gebruikt. Er worden geen gegevens naar de server van de ontwikkelaar gestuurd.",
  pl: "Po uruchomieniu dźwięk z wybranej karty i utworzone transkrypcje są wysyłane wyłącznie do wybranej usługi API tłumaczenia. Gemini używa stałego oficjalnego punktu Google Live API, a Qwen stałego punktu Alibaba Cloud Singapur. Klucze API są zapisywane na tym urządzeniu w pamięci dostępnej tylko dla zaufanych kontekstów rozszerzenia i służą wyłącznie do uwierzytelniania. Żadne dane nie trafiają na serwer twórcy.",
  ru: "После запуска звук выбранной вкладки и созданные расшифровки отправляются только в выбранный API-сервис перевода. Gemini использует фиксированную официальную точку Google Live API, а Qwen — фиксированную точку Alibaba Cloud Singapore. API-ключи хранятся на этом устройстве в хранилище, доступном только доверенным контекстам расширения, и используются лишь для аутентификации. Данные не отправляются на сервер разработчика.",
  uk: "Після запуску звук вибраної вкладки та створені транскрипти надсилаються лише до вибраного API-сервісу перекладу. Gemini використовує фіксовану офіційну точку Google Live API, а Qwen — фіксовану точку Alibaba Cloud Singapore. API-ключі зберігаються на цьому пристрої у сховищі, доступному лише довіреним контекстам розширення, і використовуються тільки для автентифікації. Дані не надсилаються на сервер розробника.",
  ar: "عند البدء، يُرسل صوت علامة التبويب المحددة والنصوص الناتجة فقط إلى خدمة API للترجمة التي اخترتها. يستخدم Gemini نقطة Google Live API الرسمية الثابتة، ويستخدم Qwen نقطة Alibaba Cloud Singapore الثابتة. تُحفظ مفاتيح API على هذا الجهاز في مساحة لا تصل إليها إلا سياقات الإضافة الموثوقة وتُستخدم للمصادقة فقط. لا تُرسل أي بيانات إلى خادم المطوّر.",
  fa: "با شروع کار، صدای برگهٔ انتخاب‌شده و رونوشت‌های تولیدشده فقط به سرویس API ترجمهٔ انتخابی فرستاده می‌شوند. Gemini از نقطهٔ ثابت و رسمی Google Live API و Qwen از نقطهٔ ثابت Alibaba Cloud Singapore استفاده می‌کند. کلیدهای API در این دستگاه و در فضایی قابل دسترس فقط برای زمینه‌های قابل اعتماد افزونه ذخیره می‌شوند و تنها برای احراز هویت به کار می‌روند. هیچ داده‌ای به سرور توسعه‌دهنده ارسال نمی‌شود.",
  hi: "शुरू करने पर चुने गए टैब का ऑडियो और बने ट्रांसक्रिप्ट केवल चुनी गई अनुवाद API सेवा को भेजे जाते हैं। Gemini तय आधिकारिक Google Live API एंडपॉइंट और Qwen तय Alibaba Cloud Singapore एंडपॉइंट का उपयोग करता है। API कुंजियाँ इस डिवाइस पर केवल विश्वसनीय एक्सटेंशन संदर्भों के लिए उपलब्ध स्टोरेज में रखी जाती हैं और सिर्फ प्रमाणीकरण में उपयोग होती हैं। डेवलपर के सर्वर को कोई डेटा नहीं भेजा जाता।",
  bn: "শুরু করলে নির্বাচিত ট্যাবের অডিও ও তৈরি ট্রান্সক্রিপ্ট শুধু নির্বাচিত অনুবাদ API সেবায় পাঠানো হয়। Gemini নির্দিষ্ট অফিসিয়াল Google Live API এন্ডপয়েন্ট এবং Qwen নির্দিষ্ট Alibaba Cloud Singapore এন্ডপয়েন্ট ব্যবহার করে। API কীগুলো এই ডিভাইসে শুধু বিশ্বস্ত এক্সটেনশন কনটেক্সটের জন্য প্রবেশযোগ্য স্টোরেজে রাখা হয় এবং কেবল প্রমাণীকরণে ব্যবহৃত হয়। ডেভেলপারের সার্ভারে কোনো ডেটা পাঠানো হয় না।",
  id: "Saat dimulai, audio tab yang dipilih dan transkrip yang dihasilkan hanya dikirim ke layanan API terjemahan pilihan Anda. Gemini memakai endpoint resmi Google Live API yang tetap dan Qwen memakai endpoint tetap Alibaba Cloud Singapura. Kunci API disimpan di perangkat ini dalam penyimpanan yang hanya dapat diakses konteks ekstensi tepercaya dan digunakan hanya untuk autentikasi. Tidak ada data yang dikirim ke server pengembang.",
  vi: "Khi bắt đầu, âm thanh của thẻ đã chọn và bản chép lời tạo ra chỉ được gửi đến dịch vụ API dịch thuật bạn chọn. Gemini dùng điểm cuối Google Live API chính thức cố định và Qwen dùng điểm cuối Alibaba Cloud Singapore cố định. Khóa API được lưu trên thiết bị này trong bộ nhớ chỉ các ngữ cảnh tiện ích đáng tin cậy mới truy cập được và chỉ dùng để xác thực. Không có dữ liệu nào được gửi đến máy chủ của nhà phát triển.",
  th: "เมื่อเริ่มทำงาน เสียงจากแท็บที่เลือกและข้อความถอดเสียงจะถูกส่งไปยังบริการ API แปลภาษาที่คุณเลือกเท่านั้น Gemini ใช้ปลายทาง Google Live API อย่างเป็นทางการแบบคงที่ และ Qwen ใช้ปลายทาง Alibaba Cloud Singapore แบบคงที่ คีย์ API จะจัดเก็บไว้ในอุปกรณ์นี้ในพื้นที่ที่เข้าถึงได้เฉพาะบริบทส่วนขยายที่เชื่อถือได้และใช้เพื่อยืนยันตัวตนเท่านั้น ไม่มีข้อมูลส่งไปยังเซิร์ฟเวอร์ของผู้พัฒนา",
  zh: "开始后，所选标签页的音频和生成的转录文本只会发送到您选择的翻译 API 服务。Gemini 使用固定的 Google 官方 Live API 端点，Qwen 使用固定的 Alibaba Cloud 新加坡端点。API 密钥保存在本设备上仅受信任扩展程序上下文可访问的存储中，并且只用于身份验证。不会向开发者的服务器发送任何数据。",
  ja: "開始すると、選択したタブの音声と生成された文字起こしは、選択した翻訳 API サービスにのみ送信されます。Gemini は固定の公式 Google Live API エンドポイントを、Qwen は固定の Alibaba Cloud シンガポールエンドポイントを使用します。API キーは、この端末上の信頼された拡張機能コンテキストだけがアクセスできる領域に保存され、認証にのみ使用されます。開発者のサーバーへデータは送信されません。",
  ko: "시작하면 선택한 탭의 오디오와 생성된 텍스트가 선택한 번역 API 서비스로만 전송됩니다. Gemini는 고정된 공식 Google Live API 엔드포인트를, Qwen은 고정된 Alibaba Cloud 싱가포르 엔드포인트를 사용합니다. API 키는 이 기기에서 신뢰할 수 있는 확장 프로그램 컨텍스트만 접근 가능한 저장소에 보관되며 인증에만 사용됩니다. 개발자의 서버로는 어떤 데이터도 전송되지 않습니다."
};

const API_HINTS = {
  tr: "Anahtar bu cihazda yalnız güvenilir uzantı bağlamlarının erişebildiği depolamada saklanır ve {provider} bağlantısında kullanılır.",
  en: "The key is stored on this device in storage accessible only to trusted extension contexts and is used for the {provider} connection.",
  de: "Der Schlüssel wird auf diesem Gerät in einem nur für vertrauenswürdige Erweiterungskontexte zugänglichen Speicher abgelegt und für die {provider}-Verbindung verwendet.",
  fr: "La clé est stockée sur cet appareil dans un espace accessible uniquement aux contextes fiables de l’extension et utilisée pour la connexion {provider}.",
  es: "La clave se guarda en este dispositivo en un almacenamiento accesible solo para contextos de confianza de la extensión y se usa para la conexión con {provider}.",
  it: "La chiave viene salvata sul dispositivo in uno spazio accessibile solo ai contesti attendibili dell’estensione e usata per la connessione {provider}.",
  pt: "A chave é guardada neste dispositivo num armazenamento acessível apenas a contextos fidedignos da extensão e usada na ligação ao {provider}.",
  nl: "De sleutel wordt op dit apparaat opgeslagen in opslag die alleen toegankelijk is voor vertrouwde extensiecontexten en gebruikt voor de {provider}-verbinding.",
  pl: "Klucz jest zapisywany na tym urządzeniu w pamięci dostępnej tylko dla zaufanych kontekstów rozszerzenia i używany do połączenia z {provider}.",
  ru: "Ключ хранится на этом устройстве в хранилище, доступном только доверенным контекстам расширения, и используется для подключения к {provider}.",
  uk: "Ключ зберігається на цьому пристрої у сховищі, доступному лише довіреним контекстам розширення, і використовується для підключення до {provider}.",
  ar: "يُحفظ المفتاح على هذا الجهاز في مساحة لا تصل إليها إلا سياقات الإضافة الموثوقة ويُستخدم لاتصال {provider}.",
  fa: "کلید در این دستگاه و در فضایی قابل دسترس فقط برای زمینه‌های قابل اعتماد افزونه ذخیره می‌شود و برای اتصال {provider} به کار می‌رود.",
  hi: "कुंजी इस डिवाइस पर केवल विश्वसनीय एक्सटेंशन संदर्भों के लिए उपलब्ध स्टोरेज में रखी जाती है और {provider} कनेक्शन में उपयोग होती है।",
  bn: "কীটি এই ডিভাইসে শুধু বিশ্বস্ত এক্সটেনশন কনটেক্সটের জন্য প্রবেশযোগ্য স্টোরেজে রাখা হয় এবং {provider} সংযোগে ব্যবহৃত হয়।",
  id: "Kunci disimpan di perangkat ini dalam penyimpanan yang hanya dapat diakses konteks ekstensi tepercaya dan digunakan untuk koneksi {provider}.",
  vi: "Khóa được lưu trên thiết bị này trong bộ nhớ chỉ các ngữ cảnh tiện ích đáng tin cậy mới truy cập được và được dùng cho kết nối {provider}.",
  th: "คีย์จะจัดเก็บไว้ในอุปกรณ์นี้ในพื้นที่ที่เข้าถึงได้เฉพาะบริบทส่วนขยายที่เชื่อถือได้ และใช้สำหรับการเชื่อมต่อ {provider}",
  zh: "密钥保存在本设备上仅受信任扩展程序上下文可访问的存储中，并用于 {provider} 连接。",
  ja: "キーは、この端末上の信頼された拡張機能コンテキストだけがアクセスできる領域に保存され、{provider} 接続に使用されます。",
  ko: "키는 이 기기에서 신뢰할 수 있는 확장 프로그램 컨텍스트만 접근 가능한 저장소에 보관되며 {provider} 연결에 사용됩니다."
};

const CONNECTION_ERRORS = {
  tr: "API bağlantısı kurulamadı ya da kesildi. Ağ bağlantısını, API anahtarını ve sağlayıcı durumunu kontrol edin.",
  en: "The API connection could not be established or was interrupted. Check the network, API key, and provider status.",
  de: "Die API-Verbindung konnte nicht hergestellt werden oder wurde unterbrochen. Prüfen Sie Netzwerk, API-Schlüssel und Anbieterstatus.",
  fr: "La connexion API n’a pas pu être établie ou a été interrompue. Vérifiez le réseau, la clé API et l’état du fournisseur.",
  es: "No se pudo establecer la conexión API o se interrumpió. Comprueba la red, la clave API y el estado del proveedor.",
  it: "Impossibile stabilire la connessione API oppure la connessione è stata interrotta. Controlla rete, chiave API e stato del provider.",
  pt: "Não foi possível estabelecer a ligação API ou esta foi interrompida. Verifique a rede, a chave API e o estado do fornecedor.",
  nl: "De API-verbinding kon niet worden gemaakt of werd onderbroken. Controleer het netwerk, de API-sleutel en de providerstatus.",
  pl: "Nie udało się nawiązać połączenia API lub zostało ono przerwane. Sprawdź sieć, klucz API i stan dostawcy.",
  ru: "Не удалось установить API-соединение или оно было прервано. Проверьте сеть, API-ключ и состояние сервиса.",
  uk: "Не вдалося встановити API-з’єднання або його було перервано. Перевірте мережу, API-ключ і стан сервісу.",
  ar: "تعذر إنشاء اتصال API أو انقطع. تحقّق من الشبكة ومفتاح API وحالة موفر الخدمة.",
  fa: "اتصال API برقرار نشد یا قطع شد. شبکه، کلید API و وضعیت ارائه‌دهنده را بررسی کنید.",
  hi: "API कनेक्शन स्थापित नहीं हो सका या टूट गया। नेटवर्क, API कुंजी और प्रदाता की स्थिति जाँचें।",
  bn: "API সংযোগ স্থাপন করা যায়নি বা বিচ্ছিন্ন হয়েছে। নেটওয়ার্ক, API কী এবং সেবাদাতার অবস্থা পরীক্ষা করুন।",
  id: "Koneksi API tidak dapat dibuat atau terputus. Periksa jaringan, kunci API, dan status penyedia.",
  vi: "Không thể thiết lập kết nối API hoặc kết nối đã bị gián đoạn. Hãy kiểm tra mạng, khóa API và trạng thái nhà cung cấp.",
  th: "ไม่สามารถสร้างการเชื่อมต่อ API หรือการเชื่อมต่อถูกตัด โปรดตรวจสอบเครือข่าย คีย์ API และสถานะของผู้ให้บริการ",
  zh: "无法建立 API 连接或连接已中断。请检查网络、API 密钥和服务商状态。",
  ja: "API 接続を確立できなかったか、接続が中断されました。ネットワーク、API キー、プロバイダーの状態を確認してください。",
  ko: "API 연결을 설정할 수 없거나 연결이 끊겼습니다. 네트워크, API 키 및 제공업체 상태를 확인하세요."
};

const dataDisclosureIndex = UI_MESSAGE_KEYS.indexOf("dataDisclosure");
const apiHintIndex = UI_MESSAGE_KEYS.indexOf("apiHint");
const errorConnectionIndex = UI_MESSAGE_KEYS.indexOf("errorConnection");
for (const language of UI_LANGUAGES) {
  ROWS[language][dataDisclosureIndex] = DATA_DISCLOSURES[language];
  ROWS[language][apiHintIndex] = API_HINTS[language];
  ROWS[language][errorConnectionIndex] = CONNECTION_ERRORS[language];
}

for (const language of UI_LANGUAGES) {
  const row = ROWS[language];
  if (!row || row.length !== UI_MESSAGE_KEYS.length) {
    throw new Error(`Incomplete UI translations for ${language}: ${row?.length || 0}/${UI_MESSAGE_KEYS.length}`);
  }
}

const MESSAGES = Object.fromEntries(
  Object.entries(ROWS).map(([language, row]) => [
    language,
    Object.fromEntries(UI_MESSAGE_KEYS.map((key, index) => [key, row[index]]))
  ])
);

function supportedLanguage(language) {
  const normalized = String(language || "").trim().toLowerCase().split("-")[0];
  return UI_LANGUAGES.includes(normalized) ? normalized : "en";
}

export function uiText(language, key, variables = {}) {
  const locale = supportedLanguage(language);
  const template = MESSAGES[locale]?.[key] || MESSAGES.en[key] || key;
  return template.replace(/\{([A-Za-z][A-Za-z0-9]*)\}/g, (match, name) => (
    Object.hasOwn(variables, name) ? String(variables[name]) : match
  ));
}

export function isRtlLanguage(language) {
  return RTL_UI_LANGUAGES.has(supportedLanguage(language));
}

export function languageDisplayName(code, interfaceLanguage) {
  const locale = supportedLanguage(interfaceLanguage);
  try {
    return new Intl.DisplayNames([locale], { type: "language" }).of(code) || code;
  } catch {
    return new Intl.DisplayNames(["en"], { type: "language" }).of(code) || code;
  }
}

const INTERNAL_ERROR_RULES = [
  { key: "errorConsent", pattern: /veri aktarımı|data.transfer|transfer.*data/i },
  { key: "errorActiveTab", pattern: /aktif sekme|active tab/i },
  { key: "errorPermission", pattern: /izin verilmedi|permission|not granted|denied/i },
  { key: "errorApiKey", pattern: /api[- ]?key|api anahtarı|unauthori[sz]ed|\b401\b/i },
  { key: "errorUrl", pattern: /base url|tam url|https:\/\/|wss:\/\/|kullanıcı adı|# parçası|url.*invalid/i },
  { key: "errorAudio", pattern: /sekme ses|yakalanabilir ses|ses akışı|ses işleyici|audio|tab capture|media stream/i },
  { key: "errorConnection", pattern: /bağlant|websocket|connection|network|timeout|closed|\b1006\b/i },
  { key: "errorSettings", pattern: /çeviri modeli|hedef dil|kaynak dil|model.*invalid|language.*invalid/i },
  { key: "errorUnknown", pattern: /bilinmeyen|unknown message|unexpected error/i }
];

export function localizeErrorMessage(message, language, provider = "API") {
  const raw = String(message || "").trim();
  if (!raw) return "";
  const match = INTERNAL_ERROR_RULES.find((rule) => rule.pattern.test(raw));
  if (match) return uiText(language, match.key, { provider });
  return uiText(language, "serviceMessage", { message: raw, provider });
}
