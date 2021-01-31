const Lsi = {
  appName: {
    cs: "Aplikace uuSubjectman",
    en: "Application uuSubjectman",
  },
  common: {
    edit: {
      cs: "Upravit",
      en: "Edit",
    },
    cancel: {
      cs: "Zrušit",
      en: "Cancel",
    },
    submit: {
      cs: "Potvrdit",
      en: "Submit",
    },
    name: { cs: "Název", en: "Name" },
    manage: { cs: "Spravovat", en: "Manage" },
    delete: { cs: "Smazat", en: "Delete" },
  },
  topic: {
    name: { cs: "Téma", en: "Topic" },
    add: { cs: "Přidat nové téma", en: "Add new topic" },
    create: { cs: "Vytvořit nové téma", en: "Create new topic" },

    topicList: {
      header: { cs: "Seznam témat", en: "Topic list" },
    },
    edit: {
      cs: "Upravit",
      en: "Edit",
    },
  },
  subject: {
    name: { cs: "Předmět", en: "Subject" },
    create: { cs: "Vytvořit nový předmět", en: "Create new subject" },
    add: { cs: "Přidat nový předmět", en: "Add new subject" },
    header: { cs: "Seznam předmětů", en: "Subject list" },
    credits: { cs: "Kredity", en: "Credits" },
    degree: { cs: "Titul", en: "Degree" },
    language: { cs: "Jazyk", en: "Language" },
    description: {cs: "Popis", en: "Description"}
  },
  content: {
    create: { cs: "Vytvořit nový digitální obsah", en: "Create new digital content" },
    name: { cs: "Digitální obsah", en: "Digital content" },
    add: { cs: "Přidat nový obsah", en: "Add new content" },
    contentType: { cs: "Typ obsahu", en: "Content type" },
  },
  left: {
    home: {
      cs: "Vítejte",
      en: "Welcome",
    },
    about: {
      cs: "O aplikaci",
      en: "About Application",
    },
  },
  top: {
    home: {
      cs: "Předměty",
      en: "Subjects",
    },
    topics: {
      cs: "Témata",
      en: "Topics",
    },
    contentList: {
      cs: "Digitální obsah",
      en: "Digital Content",
    },
    about: {
      cs: "O aplikaci",
      en: "About",
    },
  },

  about: {
    header: {
      cs: "O aplikaci uuSubjectman",
      en: "About application uuSubjectman",
    },
    creatorsHeader: {
      cs: "Tvůrci aplikace",
      en: "Application creators",
    },
    termsOfUse: {
      cs: "Podmínky užívání",
      en: "Terms of use",
    },
  },

  notAuth: {
    welcome: {
      cs: "Vítejte v šabloně pro aplikace uuAppTemplate",
      en: "Welcome in application template uuAppTemplate",
    },

    intro: {
      cs: `Tato šablona obsahuje připravenou klientskou a serverovou část. Jednotlivé komponety, které jsou zde zobrazeny,
          jsou určeny k tomu, aby demonstrovaly možnosti a způsob použití. Je vhodné je upravit, zkopírovat či smazat pro
          potřeby vyvíjené aplikace.`,
      en: `This template consist of prepared client and server side. Shown components demonstrate possibilities and way of
          using. For application developing purposes they are suitable for modifying, copying and deleting.`,
    },

    clientSide: {
      cs: "Klientská část je implementovaná s využitím komponent z knihoven uu5 a plus4u5.",
      en: "Libraries uu5 and plus4u5 are used for developing of client side.",
    },

    serverSide: {
      cs: "Pro spuštení serverové části je potřeba provést inicializaci workspace.",
      en: "It is necessary to initialize application workspace for running server side.",
    },

    login: {
      cs: "Pro přístup do aplikace se prosím přihlašte...",
      en: "Log in to access the application ...",
    },
  },

  auth: {
    welcome: {
      cs: "Vítejte",
      en: "Welcome",
    },

    intro: {
      cs: `<uu5string/>Tato šablona obsahuje připravenou klientskou a serverovou část. Jednotlivé komponety, které jsou zde zobrazeny,
          jsou určeny k tomu, aby demonstrovaly možnosti a způsob použití. Je vhodné je upravit, zkopírovat či smazat pro
          potřeby vyvíjené aplikace. Více o struktuře uuApp se dozvíte v dokumetaci viz&nbsp;
          <UU5.Bricks.Link
            href="https://uuos9.plus4u.net/uu-bookkitg01-main/78462435-25d3b166760a44b7be70e5c2eb2abaaa/book"
            target="_blank"
            content="uuApp Developer Guide"
          />.`,
      en: `<uu5string/>This template consist of prepared client and server side. Shown components demonstrate possibilities and way of
          using. For application developing purposes they are suitable for modifying, copying and deleting. More about
          uuApp Structure see documentation&nbsp;
          <UU5.Bricks.Link
            href="https://uuos9.plus4u.net/uu-bookkitg01-main/78462435-25d3b166760a44b7be70e5c2eb2abaaa/book"
            target="_blank"
            content="uuApp Developer Guide"
          />.`,
    },

    clientSide: {
      cs: `<uu5string/>Klientská část je implementovaná s využitím komponent z knihoven <UU5.Bricks.LinkUU5 /> a <UU5.Bricks.LinkUuPlus4U5 />.`,
      en: `<uu5string/>Libraries <UU5.Bricks.LinkUU5/> and <UU5.Bricks.LinkUuPlus4U5 /> are used for developing of client side.`,
    },

    serverSide: {
      cs: `<uu5string/>Pro spuštení serverové části je potřeba provést inicializaci workspace podle návodu viz
          <UU5.Bricks.Link
            href="https://uuos9.plus4u.net/uu-bookkitg01-main/78462435-18d2645682d947ba98c048610bb98934/book"
            target="_blank"
            content="uuApp Template Developer Guide"
          />.`,
      en: `<uu5string/>It is necessary to initialize application workspace for running server side. See manual
          <UU5.Bricks.Link
            href="https://uuos9.plus4u.net/uu-bookkitg01-main/78462435-18d2645682d947ba98c048610bb98934/book"
            target="_blank"
            content="uuApp Template Developer Guide"
          />.`,
    },
  },

  unauth: {
    continueToMain: {
      cs: "Pokračovat na web produktu",
      en: "Continue to the product web",
    },
    notAuthorized: {
      cs: "Nemáte dostatečná práva k použití aplikace",
      en: "You do not have sufficient rights to use the application",
    },
  },

  unauthInit: {
    buyYourOwn: {
      cs: "Můžete si koupit vlastní uuSubjectman.",
      en: "You can buy your own uuSubjectman.",
    },
    notAuthorized: {
      cs: "Nemáte právo inicializovat tuto aplikaci uuSubjectman.",
      en: "You don't have rights to initialize this uuSubjectman.",
    },
  },

  controlPanel: {
    rightsError: {
      cs: "K zobrazení komponenty nemáte dostatečná práva.",
      en: "You do not have sufficient rights to display this component.",
    },

    btNotConnected: {
      cs: "Aplikace není napojená na Business Territory",
      en: "The application is not connected to a Business Territory",
    },
  },
};

export default Lsi;
