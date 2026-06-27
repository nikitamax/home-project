import { useEffect, useMemo, useRef, useState } from "react";

const summary = [
  {
    category: "Работы",
    amount: 2000000,
    note: "Стоимость ремонтных работ по проекту: демонтаж, черновые, отделка, монтаж инженерии, сантехники и электрики",
    accent: "#8b8780",
  },
  {
    category: "Отделочные материалы",
    amount: 664776,
    note: "Кварц-винил 95 м², краска Caparol Samtex 7, керамогранит Maimoon Urban Light, плитка 100×100, плитка коридора и плитка кухни Equipe",
    accent: "#b8633a",
  },
  {
    category: "Черновые материалы",
    amount: 377740,
    note: "Оценка по рынку Краснодара (вне сметы студии): штукатурка с переделкой, стяжка пола, наливной пол, гидроизоляция, ГКЛ, электрика и сантехника начерно",
    accent: "#6b6358",
  },
  {
    category: "Дверные механизмы",
    amount: 359000,
    note: "6 дверей-комплектов по 55 000 ₽, 6 ручек и 4 завёртки",
    accent: "#6b4a3a",
  },
  {
    category: "Сантехническое оборудование",
    amount: 212200,
    note: "Ванна Helmken, инсталляция CeramicaNova и унитаз Balearica, душевая Grocenberg, умывальник Grace, смеситель, сифон, полотенцесушитель",
    accent: "#2c4a5b",
  },
  {
    category: "Освещение",
    amount: 118000,
    note: "Комплект светильников по отдельному файлу проекта",
    accent: "#c9a13b",
  },
  {
    category: "Электрика",
    amount: 103000,
    note: "Электроустановочные изделия DONEL R98 Сталь",
    accent: "#5b6e8c",
  },
  {
    category: "Окна",
    amount: 50000,
    note: "Покраска окон",
    accent: "#4a7c6b",
  },
  {
    category: "Плинтус",
    amount: 41000,
    note: "Напольный плинтус, 82 м.п. по 500 ₽",
    accent: "#877a5b",
  },
  {
    category: "Умный дом",
    amount: 44980,
    note: "Умный замок Aqara Door Lock A100 Zigbee Edition и работы по его установке",
    accent: "#4f7a8a",
  },
];

const items = [
  ["Работы", "Ремонтные работы под ключ", "2 000 000 ₽", "", "Согласовано", "Стоимость работ по проекту"],
  ["Отделочные материалы", "Краска для стен — Caparol Samtex 7", "132 000 ₽", "", "Согласовано", "220 м² × 600 ₽; колер уточняется после выкрасов"],
  ["Отделочные материалы", "Плитка 1200×600 — Maimoon Urban Light", "109 560 ₽", "", "Согласовано", "44 м² × 2 490 ₽"],
  ["Отделочные материалы", "Плитка 100×100", "21 900 ₽", "", "Согласовано", "10 м² × 2 190 ₽"],
  ["Отделочные материалы", "Плитка для коридора", "17 800 ₽", "", "Согласовано", "4 м² × 4 450 ₽"],
  ["Отделочные материалы", "Кварц-винил — АХД", "332 500 ₽", "", "Согласовано", "95 м² × 3 500 ₽"],
  ["Отделочные материалы", "Плитка на фартук и столешницу кухни — Equipe Altea White 10×10", "51 016 ₽", "", "Согласовано", "7 м² × 7 288 ₽"],
  ["Сантехническое оборудование", "Ванна акриловая 180×80 Helmken Alvaro (2-в-1: ванна + каркас)", "34 000 ₽", "", "Согласовано", "1 шт."],
  ["Сантехническое оборудование", "Комплект инсталляции CeramicaNova Вектор + кнопка Flat, хром матовый", "37 000 ₽", "", "Согласовано", "1 шт."],
  ["Сантехническое оборудование", "Унитаз подвесной Balearica Rimless CN6000MC, капучино матовый", "25 000 ₽", "", "Согласовано", "1 шт."],
  ["Сантехническое оборудование", "Умывальник накладной Grace 810×457 мм, белый", "30 300 ₽", "", "Согласовано", "1 шт."],
  ["Сантехническое оборудование", "Смеситель для раковины встраиваемый Grocenberg GB511NK, никель", "14 000 ₽", "", "Согласовано", "1 шт."],
  ["Сантехническое оборудование", "Сифон для раковины", "10 000 ₽", "", "Согласовано", "1 шт."],
  ["Сантехническое оборудование", "Душевая система встраиваемая Grocenberg GB5099NK-1, никель", "36 900 ₽", "", "Согласовано", "1 шт."],
  ["Сантехническое оборудование", "Полотенцесушитель", "25 000 ₽", "", "Согласовано", "1 шт."],
  ["Освещение", "Комплект светильников по проекту", "118 000 ₽", "", "Согласовано", "По отдельному файлу проекта"],
  ["Электрика", "Электроустановочные изделия DONEL R98 Сталь", "103 000 ₽", "", "Согласовано", "Розетки, выключатели и рамки — по отдельному файлу"],
  ["Дверные механизмы", "Дверь — комплект, 6 шт.", "330 000 ₽", "", "Согласовано", "6 × 55 000 ₽"],
  ["Дверные механизмы", "Дверные ручки, 6 шт.", "21 000 ₽", "", "Согласовано", "6 × 3 500 ₽"],
  ["Дверные механизмы", "Завёртки (WC), 4 шт.", "8 000 ₽", "", "Согласовано", "4 × 2 000 ₽"],
  ["Окна", "Окна — покраска", "50 000 ₽", "", "Согласовано", "1 комплект"],
  ["Плинтус", "Плинтус напольный, 82 м.п.", "41 000 ₽", "", "Согласовано", "82 м.п. × 500 ₽"],
  ["Черновые материалы", "Штукатурка стен гипсовая — выравнивание/переделка, маяки", "67 500 ₽", "", "Запланировано", "Оценка по Краснодару, вне сметы студии: 270 м² × 250 ₽"],
  ["Черновые материалы", "Шпаклёвка финишная под покраску/обои (2 слоя)", "19 440 ₽", "", "Запланировано", "Оценка: 216 м² × 90 ₽"],
  ["Черновые материалы", "Грунтовка глубокого проникновения (стены и пол, 2 слоя)", "13 300 ₽", "", "Запланировано", "Оценка: 380 м² × 35 ₽"],
  ["Черновые материалы", "Стяжка пола полусухая — заливка (ЦПС, фибра, лента, плёнка)", "25 600 ₽", "", "Запланировано", "Оценка: 80 м² × 320 ₽"],
  ["Черновые материалы", "Наливной пол — ровнитель под кварц-винил", "10 500 ₽", "", "Запланировано", "Оценка: 70 м² × 150 ₽"],
  ["Черновые материалы", "Гидроизоляция обмазочная (с/у, мокрые зоны)", "14 000 ₽", "", "Запланировано", "Оценка: 40 м² × 350 ₽"],
  ["Черновые материалы", "ГКЛ: перегородки, короба, опуск потолка (ВГКЛ, профиль, крепёж)", "45 000 ₽", "", "Запланировано", "Оценка, комплект"],
  ["Черновые материалы", "Звуко- и теплоизоляция перегородок", "6 400 ₽", "", "Запланировано", "Оценка: 40 м² × 160 ₽"],
  ["Черновые материалы", "Электрика черновая (кабель ~900 м, гофра, подрозетники, щит и автоматы)", "105 000 ₽", "", "Запланировано", "Оценка, комплект"],
  ["Черновые материалы", "Сантехника черновая (трубы, канализация, фитинги, коллектор)", "42 000 ₽", "", "Запланировано", "Оценка, комплект"],
  ["Черновые материалы", "Плиточный клей и затирка", "11 000 ₽", "", "Запланировано", "Оценка, комплект"],
  ["Черновые материалы", "Расходники (пена, крепёж, профиль, мешки, СВП)", "18 000 ₽", "", "Запланировано", "Оценка, комплект"],
  ["Умный дом", "Умный замок Aqara Door Lock A100 Zigbee Edition", "34 990 ₽", "", "Согласовано", "Цена по официальному сайту Aqara, июнь 2026"],
  ["Умный дом", "Работы по замене и установке замка Aqara", "9 990 ₽", "", "Запланировано", "Установка умного замка на металлическую дверь; для деревянной — от 8 990 ₽"],
].map(([category, item, plan, fact, status, comment]) => ({
  category,
  item,
  plan,
  fact,
  status,
  comment,
}));

const renders = [
  {
    title: "Гостиная: общий вид",
    room: "Гостиная",
    image: "/renders/living-room/living-room-overview.jpg",
    description: "Главная сцена с диваном, ковром, акцентным столиком и крупным текстилем.",
    tags: ["диван", "ковер", "шторы"],
  },
  {
    title: "Кухня и столовая зона",
    room: "Кухня",
    image: "/renders/living-room/kitchen-dining-view.jpg",
    description: "Кухонный гарнитур со светлым фартуком и компактной обеденной группой.",
    tags: ["гарнитур", "фартук", "стол"],
  },
  {
    title: "ТВ-стена",
    room: "Гостиная",
    image: "/renders/living-room/living-room-tv-wall.jpg",
    description: "Медиаконсоль, торшер и дополнительный декоративный слой.",
    tags: ["ТВ-тумба", "торшер", "декор"],
  },
  {
    title: "Акцентный столик",
    room: "Гостиная",
    image: "/renders/living-room/living-room-coffee-table-detail.jpg",
    description: "Деталь синего журнального столика и текстуры ковра.",
    tags: ["столик", "текстуры", "деталь"],
  },
  {
    title: "Спальня: фронтальный вид",
    room: "Спальня",
    image: "/renders/bedroom/bedroom-bed-front.jpg",
    description: "Кровать, мягкое изголовье и декоративная штукатурка на акцентной стене.",
    tags: ["кровать", "панели", "штукатурка"],
  },
  {
    title: "Тумба и окно",
    room: "Спальня",
    image: "/renders/bedroom/bedroom-bedside-detail.jpg",
    description: "Фрагмент спальни с тумбой, шторами и мягким светом у окна.",
    tags: ["тумба", "шторы", "текстиль"],
  },
  {
    title: "Комод и искусство",
    room: "Спальня",
    image: "/renders/bedroom/bedroom-dresser-art.jpg",
    description: "Подвесной комод, лампа и крупная картина как декоративный акцент.",
    tags: ["комод", "картина", "декор"],
  },
  {
    title: "Рабочее место в спальне",
    room: "Спальня",
    image: "/renders/bedroom/bedroom-workspace-view.jpg",
    description: "Подвесной стол и кресло встроены в композицию спальни — отдельная рабочая ниша рядом с кроватью.",
    tags: ["стол", "кресло", "ниша"],
  },
  {
    title: "Рабочее место в спальне: деталь",
    room: "Спальня",
    image: "/renders/bedroom/bedroom-workspace-detail.jpg",
    description: "Надстройка стола и встроенный стеллаж в нише спальни.",
    tags: ["надстройка", "стеллаж", "деталь"],
  },
  {
    title: "Кабинет: рабочее место и встроенный шкаф",
    room: "Кабинет",
    image: "/renders/cabinet/cabinet-workspace-shelf.jpg",
    description: "Регулируемый по высоте стол, встроенный шпонированный стеллаж и зона хранения у окна.",
    tags: ["стол", "стеллаж", "кабинет"],
  },
  {
    title: "Кабинет: фронтальный вид рабочего места",
    room: "Кабинет",
    image: "/renders/cabinet/cabinet-workspace-front.jpg",
    description: "Стол со столешницей и регулируемой базой, монитор, дизайнерский радиатор у окна и постер над столом.",
    tags: ["стол", "монитор", "радиатор"],
  },
  {
    title: "Кабинет: зона отдыха с пуфом и гитарой",
    room: "Кабинет",
    image: "/renders/cabinet/cabinet-reading-nook.jpg",
    description: "Карамельный вельветовый пуф у бетонной акцентной стены, графическая картина и полосатый ковер.",
    tags: ["пуф", "картина", "ковёр"],
  },
  {
    title: "Кабинет: деталь столешницы",
    room: "Кабинет",
    image: "/renders/cabinet/cabinet-desk-detail.jpg",
    description: "Близкий план деревянной столешницы — той части, которая заложена в смете отдельно от регулируемой базы.",
    tags: ["столешница", "деталь", "материалы"],
  },
  {
    title: "Ванная: раковина и зеркало",
    room: "Ванная",
    image: "/renders/bathroom/bathroom-view01.jpg",
    description: "Тумба с раковиной, скульптурное зеркало и тёплая древесная отделка зоны хранения.",
    tags: ["тумба", "зеркало", "санузел"],
  },
  {
    title: "Ванная: общий вид с ванной",
    room: "Ванная",
    image: "/renders/bathroom/bathroom-view02.jpg",
    description: "Общий вид санузла с ванной, полотенцесушителем и контрастом светлых и тёмных поверхностей.",
    tags: ["ванна", "полотенцесушитель", "общий вид"],
  },
  {
    title: "Ванная: фронтальный вид ванной",
    room: "Ванная",
    image: "/renders/bathroom/bathroom-view03.jpg",
    description: "Фронтальный ракурс на ванну и тёмную плитку, который хорошо показывает композицию мокрой зоны.",
    tags: ["ванна", "плитка", "мокрая зона"],
  },
  {
    title: "Прихожая: входная зона с банкеткой",
    room: "Прихожая",
    image: "/renders/hallway/hallway-entry-bench.jpg",
    description: "Узорная цементная плитка, мягкая банкетка с резным основанием, крупная абстрактная картина и арочное зеркало во всю стену.",
    tags: ["банкетка", "зеркало", "плитка"],
  },
  {
    title: "Прихожая: коридор с подсвеченными нишами",
    room: "Прихожая",
    image: "/renders/hallway/hallway-corridor-niches.jpg",
    description: "Перспектива коридора с открытыми нишами, скрытой подсветкой и парой картин — связка прихожей с кухней.",
    tags: ["ниши", "подсветка", "коридор"],
  },
  {
    title: "Детская: рабочее место и панно с животными",
    room: "Детская",
    image: "/renders/kids-room/kids-room-desk-mural.jpg",
    description: "Встроенный письменный стол под окном, эргономичное кресло и акцентные обои-панно с растениями и животными.",
    tags: ["стол", "обои", "кресло"],
  },
  {
    title: "Детская: кровать и шкаф",
    room: "Детская",
    image: "/renders/kids-room/kids-room-bed-overview.jpg",
    description: "Карамельная односпальная кровать со звёздным текстилем, оливково-зелёный встроенный шкаф и сплит-система над изголовьем.",
    tags: ["кровать", "шкаф", "текстиль"],
  },
  {
    title: "Детская: бра-шары над изголовьем",
    room: "Детская",
    image: "/renders/kids-room/kids-room-bed-detail.jpg",
    description: "Деталь зоны изголовья: парные бра с двойными шарами, оливковый шкаф с круглыми деревянными ручками и текстиль со звёздами.",
    tags: ["бра", "шкаф", "деталь"],
  },
  {
    title: "Детская: рабочее место под окнами",
    room: "Детская",
    image: "/renders/kids-room/kids-room-workspace-window.jpg",
    description: "Встроенный стол со стеллажами от стены до стены под двумя окнами, льняные шторы и полосатый ковёр.",
    tags: ["стол", "стеллаж", "ковёр"],
  },
];

const plans = [
  {
    title: "Дизайн-проект (полный)",
    file: "/plans/design-project.pdf",
    size: "16 MB",
    description: "Готовый дизайн-проект студии AHD: планировка, развёртки стен, электрика и освещение, ведомости материалов и узлы. 32 листа формата A3.",
    tags: ["дизайн-проект", "развёртки", "ведомости материалов", "электрика"],
  },
  {
    title: "Обмерный план квартиры",
    file: "/plans/apartment-measurements.pdf",
    size: "94 KB",
    description: "Базовый документ с размерами квартиры для проверки габаритов и проходов.",
    tags: ["обмеры", "размеры", "основа проекта"],
  },
  {
    title: "План расстановки мебели",
    file: "/plans/furniture-layout.pdf",
    size: "249 KB",
    description: "Схема мебели по помещениям для сверки бюджета с реальной композицией.",
    tags: ["мебель", "планировка", "композиция"],
  },
];

const statusClassMap = {
  Запланировано: "status-planned",
  Предпочтительно: "status-preferred",
  Опционально: "status-optional",
  "На проверке": "status-review",
  "Согласовано": "status-done",
};

const navItems = [
  { path: "/", label: "Бюджет" },
  { path: "/renders", label: "Рендеры" },
  { path: "/plans", label: "Планы" },
];

const roomOrder = ["Вся квартира", "Прихожая", "Гостиная", "Кухня", "Спальня", "Детская", "Кабинет", "Ванная"];

const money = new Intl.NumberFormat("ru-RU");

function formatMoney(value) {
  return `${money.format(value)} ₽`;
}

function pluralize(count, one, two, five) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return two;
  return five;
}

function getPath() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  return navItems.some((item) => item.path === path) ? path : "/";
}

function getRoomsForBudgetItem(category, item) {
  const normalized = `${category} ${item}`.toLowerCase();

  if (normalized.includes("прихож") || normalized.includes("у входа")) {
    return ["Прихожая"];
  }

  if (normalized.includes("детск")) {
    return ["Детская"];
  }

  if (
    category === "Сантехника" ||
    category === "Сантехническое оборудование" ||
    normalized.includes("ванн") ||
    normalized.includes("унитаз") ||
    normalized.includes("раковин") ||
    normalized.includes("полотенцесуш") ||
    normalized.includes("мокрой зоны") ||
    normalized.includes("керамогранит")
  ) {
    return ["Ванная"];
  }

  if (
    category === "Кухня" ||
    normalized.includes("кухон") ||
    normalized.includes("обеденн") ||
    normalized.includes("фартук") ||
    normalized.includes("столешница кухни")
  ) {
    return ["Кухня"];
  }

  if (
    normalized.includes("кабинет") ||
    normalized.includes("сноубордиста")
  ) {
    return ["Кабинет"];
  }

  if (
    normalized.includes("кварцвинил") ||
    normalized.includes('spc в раскладке "елка"')
  ) {
    return ["Гостиная", "Спальня"];
  }

  if (
    normalized.includes("шторы и тюль в спальне") ||
    normalized.includes("рабочей зоне") ||
    normalized.includes("рабоч") ||
    normalized.includes("письменный стол") ||
    normalized.includes("офисное кресло")
  ) {
    return ["Спальня"];
  }

  if (
    normalized.includes("диван") ||
    normalized.includes("журнальный стол") ||
    normalized.includes("тв-тумба") ||
    normalized.includes("медиаконсоль") ||
    normalized.includes("ковер") ||
    normalized.includes("над диваном") ||
    normalized.includes("декор гостиной") ||
    normalized.includes("шторы и тюль в гостиной")
  ) {
    return ["Гостиная"];
  }

  if (
    normalized.includes("кровать") ||
    normalized.includes("изголов") ||
    normalized.includes("прикроват") ||
    normalized.includes("подвесной комод") ||
    normalized.includes("над комодом") ||
    normalized.includes("декоративная штукатурка") ||
    normalized.includes("декор спальни")
  ) {
    return ["Спальня"];
  }

  if (
    normalized.includes("шторным зонам") ||
    normalized.includes("curtain controller")
  ) {
    return ["Гостиная", "Спальня", "Кабинет"];
  }

  return ["Вся квартира"];
}

const budgetItems = items.map((item) => ({
  ...item,
  rooms: getRoomsForBudgetItem(item.category, item.item),
}));

function App() {
  const [path, setPath] = useState(getPath);
  const [query, setQuery] = useState("");
  const [activeStatus, setActiveStatus] = useState("all");
  const [activeCategory, setActiveCategory] = useState("Все категории");
  const [activeRoom, setActiveRoom] = useState("Все комнаты");

  useEffect(() => {
    const onPopState = () => setPath(getPath());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [path]);

  const total = summary.reduce((acc, item) => acc + item.amount, 0);
  const focus = [...summary].sort((a, b) => b.amount - a.amount)[0];
  const categories = useMemo(
    () => ["Все категории", ...new Set(budgetItems.map((item) => item.category))],
    []
  );
  const statuses = useMemo(
    () => ["all", ...new Set(budgetItems.map((item) => item.status))],
    []
  );
  const rooms = useMemo(
    () => [
      "Все комнаты",
      ...roomOrder.filter((room) =>
        budgetItems.some((item) => item.rooms.includes(room))
      ),
    ],
    []
  );

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return budgetItems.filter((item) => {
      const matchesCategory =
        activeCategory === "Все категории" || item.category === activeCategory;
      const matchesStatus =
        activeStatus === "all" || item.status === activeStatus;
      const matchesRoom =
        activeRoom === "Все комнаты" || item.rooms.includes(activeRoom);
      const haystack = `${item.category} ${item.item} ${item.comment} ${item.status} ${item.rooms.join(" ")}`.toLowerCase();
      const matchesQuery = normalized === "" || haystack.includes(normalized);
      return matchesCategory && matchesStatus && matchesRoom && matchesQuery;
    });
  }, [query, activeCategory, activeStatus, activeRoom]);

  function navigate(nextPath) {
    if (nextPath === path) return;
    window.history.pushState({}, "", nextPath);
    setPath(nextPath);
  }

  return (
    <div className="app-shell">
      <div className="page">
        <SiteHeader path={path} onNavigate={navigate} />
        <Hero
          path={path}
          total={total}
          renderCount={renders.length}
          planCount={plans.length}
          onNavigate={navigate}
        />
        {path === "/" ? (
          <BudgetPage
            total={total}
            focus={focus}
            categories={categories}
            statuses={statuses}
            rooms={rooms}
            filteredItems={filteredItems}
            activeCategory={activeCategory}
            activeStatus={activeStatus}
            activeRoom={activeRoom}
            query={query}
            onCategoryChange={setActiveCategory}
            onStatusChange={setActiveStatus}
            onRoomChange={setActiveRoom}
            onQueryChange={setQuery}
            onNavigate={navigate}
          />
        ) : path === "/renders" ? (
          <RendersPage />
        ) : (
          <PlansPage />
        )}
      </div>
    </div>
  );
}

function SiteHeader({ path, onNavigate }) {
  return (
    <header className="site-header">
      <button className="brand-block" onClick={() => onNavigate("/")}>
        <span className="brand-kicker">Home Project</span>
        <span className="brand-title">Квартира Мурата Ахеджака 26</span>
      </button>
      <TopNav path={path} onNavigate={onNavigate} />
    </header>
  );
}

function Hero({ path, total, renderCount, planCount, onNavigate }) {
  const copy = {
    "/": {
      eyebrow: "Budget Dashboard",
      title: "",
      text: "Главный экран сфокусирован на цифрах, категориях и рабочих позициях. Рендеры и планы вынесены в отдельные разделы и связаны общей навигацией.",
      preview: (
        <div className="hero-stat">
          <div className="total-label">Итого по рендерам</div>
          <div className="total-value">{formatMoney(total)}</div>
          <p>В сумму входят чистовые материалы, сантехника, кухня, мебель, декор и работы по ванной.</p>
        </div>
      ),
    },
    "/renders": {
      eyebrow: "Renders",
      title: "Рендеры интерьера по комнатам",
      text: "Отдельная галерея проекта без бюджетного шума: прихожая, гостиная, кухня, спальня, детская, кабинет и ванная в одном визуальном разделе.",
      preview: <img src="/renders/living-room/living-room-overview.jpg" alt="Рендер гостиной" />,
    },
    "/plans": {
      eyebrow: "Plans",
      title: "Планы и рабочие схемы проекта",
      text: "Обмерный план и расстановка мебели собраны в отдельном разделе с PDF-просмотром и быстрыми ссылками на документы.",
      preview: (
        <object data="/plans/furniture-layout.pdf#toolbar=0&navpanes=0&scrollbar=0" type="application/pdf" />
      ),
    },
  }[path];

  return (
    <section className="hero">
      <div className="hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">{copy.eyebrow}</span>
          {copy.title ? <h1>{copy.title}</h1> : null}
          <p>{copy.text}</p>
          <div className="hero-meta">
            <button className="meta-chip meta-chip-button" onClick={() => onNavigate("/")}>Краснодар · бюджет</button>
            <button className="meta-chip meta-chip-button" onClick={() => onNavigate("/renders")}>{renderCount} {pluralize(renderCount, "рендер", "рендера", "рендеров")}</button>
            <button className="meta-chip meta-chip-button" onClick={() => onNavigate("/plans")}>{planCount} {pluralize(planCount, "план", "плана", "планов")}</button>
          </div>
        </div>
        <div className="hero-preview">{copy.preview}</div>
      </div>
    </section>
  );
}

function TopNav({ path, onNavigate }) {
  return (
    <nav className="top-nav">
      {navItems.map((item) => (
        <button
          key={item.path}
          className={`nav-pill ${path === item.path ? "nav-pill-active" : ""}`}
          onClick={() => onNavigate(item.path)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}

function BudgetPage(props) {
  const {
    total,
    focus,
    categories,
    statuses,
    rooms,
    filteredItems,
    activeCategory,
    activeStatus,
    activeRoom,
    query,
    onCategoryChange,
    onStatusChange,
    onRoomChange,
    onQueryChange,
    onNavigate,
  } = props;

  return (
    <>
      <section className="section summary-grid">
        {summary.map((item) => {
          const share = Math.round((item.amount / total) * 100);
          return (
            <article key={item.category} className="card summary-card" style={{ "--card-accent": item.accent }}>
              <div className="label">{item.category}</div>
              <div className="value">{formatMoney(item.amount)}</div>
              <div className="share">{share}% от рендерного бюджета</div>
              <p className="summary-note">{item.note}</p>
            </article>
          );
        })}
      </section>

      <section className="section panel-layout">
        <article className="card insight-card" style={{ "--card-accent": "#b8633a" }}>
          <h3>Как читать страницу</h3>
          <p>Бюджет живет на главном экране, а рендеры и планы открываются отдельными разделами. Так проще переключаться между анализом стоимости и визуальным контекстом.</p>
          <div className="breakdown-list">
            {summary.map((item) => {
              const share = ((item.amount / total) * 100).toFixed(1);
              return (
                <div className="breakdown-item" key={item.category}>
                  <div className="breakdown-row">
                    <strong>{item.category}</strong>
                    <span>{formatMoney(item.amount)} · {share}%</span>
                  </div>
                  <div className="bar">
                    <div style={{ "--bar-color": item.accent, "--fill-width": `${share}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </article>

        <div className="insight-grid">
          <article className="card insight-card" style={{ "--card-accent": "#2c4a5b" }}>
            <h3>Главный фокус</h3>
            <p>{focus.category} занимает самую крупную долю в рендерном бюджете: {formatMoney(focus.amount)}. Если понадобится быстро оптимизировать смету, начинать разумнее всего с этой категории.</p>
          </article>
          <article className="card insight-card" style={{ "--card-accent": "#828747" }}>
            <h3>Что не входит</h3>
            <p>В аналитике уже есть прихожая, детская и ванная по рендерам. Отдельно по-прежнему не заложены освещение по всей квартире, сплит-система для детской, техника, общестроительные работы вне ванной и сантехника кухни.</p>
          </article>
          <article className="card insight-card" style={{ "--card-accent": "#7a4b68" }}>
            <h3>Связанные разделы</h3>
            <p>Если хочешь проверить, как цифры соотносятся с интерьером и планировкой, открой отдельные страницы с рендерами и PDF-планами.</p>
            <div className="quick-actions">
              <button className="button-link primary" onClick={() => onNavigate("/renders")}>К рендерам</button>
              <button className="button-link cobalt" onClick={() => onNavigate("/plans")}>К планам</button>
            </div>
          </article>
          <article className="card insight-card" style={{ "--card-accent": "#c5a04c" }}>
            <h3>Формат оценок</h3>
            <p>Если у позиции пока нет точного SKU, сумма заложена как аккуратный плановый ориентир под Краснодар. Это удобно для принятия решений до реальной закупки.</p>
          </article>
        </div>
      </section>

      <section className="section card media-shell" style={{ "--card-accent": "#92633c" }}>
        <div className="section-head">
          <div>
            <span className="section-kicker">Project Media</span>
            <h2>Рендеры и планы живут отдельно</h2>
            <p>Главный экран остался легким и финансовым, а визуальные материалы проекта переехали в отдельные React-экраны.</p>
          </div>
        </div>
        <div className="resource-grid">
          <article className="resource-card">
            <div className="resource-preview">
              <img src="/renders/living-room/living-room-overview.jpg" alt="Превью рендеров" />
            </div>
            <div className="section-kicker">Renders · {renders.length} {pluralize(renders.length, "вид", "вида", "видов")}</div>
            <h3>Страница с рендерами</h3>
            <p>Отдельная галерея по прихожей, гостиной, кухне, спальне, детской, кабинету и ванной.</p>
            <button className="button-link primary" onClick={() => onNavigate("/renders")}>Открыть рендеры</button>
          </article>

          <article className="resource-card">
            <div className="resource-preview resource-preview-pdf">
              <object data="/plans/furniture-layout.pdf#toolbar=0&navpanes=0&scrollbar=0" type="application/pdf" />
            </div>
            <div className="section-kicker">Plans · 2 PDF</div>
            <h3>Страница с планами</h3>
            <p>Обмерный план и расстановка мебели с предпросмотром PDF и быстрыми ссылками.</p>
            <button className="button-link cobalt" onClick={() => onNavigate("/plans")}>Открыть планы</button>
          </article>
        </div>
      </section>

      <section className="section card table-card" style={{ "--card-accent": "#2c4a5b" }}>
        <div className="toolbar">
          <input
            className="input"
            type="search"
            placeholder="Искать по позиции, категории или комментарию"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
          />
          <select className="select" value={activeRoom} onChange={(event) => onRoomChange(event.target.value)}>
            {rooms.map((room) => (
              <option key={room} value={room}>
                {room}
              </option>
            ))}
          </select>
          <select className="select" value={activeStatus} onChange={(event) => onStatusChange(event.target.value)}>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status === "all" ? "Все статусы" : status}
              </option>
            ))}
          </select>
          <div className="meta-chip">{filteredItems.length} {pluralize(filteredItems.length, "позиция", "позиции", "позиций")}</div>
        </div>

        <div className="filter-pills">
          {categories.map((category) => (
            <button
              key={category}
              className={`pill ${category === activeCategory ? "active" : ""}`}
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="filter-pills">
          {rooms.map((room) => (
            <button
              key={room}
              className={`pill ${room === activeRoom ? "active" : ""}`}
              onClick={() => onRoomChange(room)}
            >
              {room}
            </button>
          ))}
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Комната</th>
                <th>Категория</th>
                <th>Позиция</th>
                <th>План</th>
                <th>Факт</th>
                <th>Статус</th>
                <th>Комментарий</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={`${item.category}-${item.item}`}>
                  <td><span className="table-room">{item.rooms.join(" · ")}</span></td>
                  <td>{item.category}</td>
                  <td><strong>{item.item}</strong></td>
                  <td className="money">{item.plan || "—"}</td>
                  <td className="money">{item.fact || "—"}</td>
                  <td><span className={`status ${statusClassMap[item.status] || "status-planned"}`}>{item.status}</span></td>
                  <td className="comment">{item.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredItems.length === 0 ? (
          <div className="empty-state">По текущему набору фильтров ничего не найдено. Попробуй сбросить комнату, категорию или статус.</div>
        ) : null}

        <div className="footnote">
          Основа этого экрана — данные из <code>budget/budget.md</code>, перенесенные в React-интерфейс для удобного чтения и будущего деплоя.
        </div>
      </section>
    </>
  );
}

function RendersPage() {
  const [activeIndex, setActiveIndex] = useState(null);
  const hallway = renders.filter((item) => item.room === "Прихожая");
  const living = renders.filter((item) =>
    item.room === "Гостиная" || item.room === "Кухня"
  );
  const bedroom = renders.filter((item) => item.room === "Спальня");
  const kidsRoom = renders.filter((item) => item.room === "Детская");
  const cabinet = renders.filter((item) => item.room === "Кабинет");
  const bathroom = renders.filter((item) => item.room === "Ванная");

  const openRender = (item) => setActiveIndex(renders.indexOf(item));
  const closeLightbox = () => setActiveIndex(null);
  const goPrev = () =>
    setActiveIndex((current) =>
      current === null ? null : (current - 1 + renders.length) % renders.length
    );
  const goNext = () =>
    setActiveIndex((current) =>
      current === null ? null : (current + 1) % renders.length
    );

  useEffect(() => {
    if (activeIndex === null) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeLightbox();
      else if (event.key === "ArrowLeft") goPrev();
      else if (event.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex]);

  return (
    <>
      <RendersSlider items={renders} onOpen={openRender} />
      <MediaSection title="Прихожая" kicker="Hallway" count={`${hallway.length} ${pluralize(hallway.length, "вид", "вида", "видов")}`}>
        <div className="gallery-grid">
          {hallway.map((item) => (
            <RenderCard
              key={item.title}
              item={item}
              onOpen={() => openRender(item)}
            />
          ))}
        </div>
      </MediaSection>
      <MediaSection title="Гостиная и кухня" kicker="Living Room" count={`${living.length} ${pluralize(living.length, "вид", "вида", "видов")}`}>
        <div className="gallery-grid">
          {living.map((item) => (
            <RenderCard
              key={item.title}
              item={item}
              onOpen={() => openRender(item)}
            />
          ))}
        </div>
      </MediaSection>
      <MediaSection title="Спальня и рабочая зона" kicker="Bedroom" count={`${bedroom.length} ${pluralize(bedroom.length, "вид", "вида", "видов")}`}>
        <div className="gallery-grid">
          {bedroom.map((item) => (
            <RenderCard
              key={item.title}
              item={item}
              onOpen={() => openRender(item)}
            />
          ))}
        </div>
      </MediaSection>
      <MediaSection title="Детская" kicker="Kids Room" count={`${kidsRoom.length} ${pluralize(kidsRoom.length, "вид", "вида", "видов")}`}>
        <div className="gallery-grid">
          {kidsRoom.map((item) => (
            <RenderCard
              key={item.title}
              item={item}
              onOpen={() => openRender(item)}
            />
          ))}
        </div>
      </MediaSection>
      <MediaSection title="Кабинет" kicker="Cabinet" count={`${cabinet.length} ${pluralize(cabinet.length, "вид", "вида", "видов")}`}>
        <div className="gallery-grid">
          {cabinet.map((item) => (
            <RenderCard
              key={item.title}
              item={item}
              onOpen={() => openRender(item)}
            />
          ))}
        </div>
      </MediaSection>
      <MediaSection title="Ванная" kicker="Bathroom" count={`${bathroom.length} ${pluralize(bathroom.length, "вид", "вида", "видов")}`}>
        <div className="gallery-grid">
          {bathroom.map((item) => (
            <RenderCard
              key={item.title}
              item={item}
              onOpen={() => openRender(item)}
            />
          ))}
        </div>
      </MediaSection>
      <RenderLightbox
        item={activeIndex !== null ? renders[activeIndex] : null}
        index={activeIndex}
        total={renders.length}
        onClose={closeLightbox}
        onPrev={goPrev}
        onNext={goNext}
      />
    </>
  );
}

function RendersSlider({ items, onOpen }) {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const total = items.length;

  const scrollByOne = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const slideWidth = track.clientWidth;
    const maxLeft = slideWidth * (total - 1);
    const target = Math.max(0, Math.min(maxLeft, track.scrollLeft + direction * slideWidth));
    track.scrollTo({ left: target, behavior: "smooth" });
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    const next = Math.round(track.scrollLeft / track.clientWidth);
    setActiveIndex((current) => (current === next ? current : next));
  };

  const item = items[activeIndex] ?? items[0];

  return (
    <section className="section card slider-shell" style={{ "--card-accent": "#b8633a" }}>
      <div className="slider-stage">
        <button
          type="button"
          className="slider-nav slider-prev"
          onClick={() => scrollByOne(-1)}
          aria-label="Предыдущий рендер"
          disabled={activeIndex === 0}
        >
          ‹
        </button>
        <div className="slider-track" ref={trackRef} onScroll={handleScroll}>
          {items.map((slide) => (
            <button
              key={slide.title}
              type="button"
              className="slider-slide"
              onClick={() => onOpen(slide)}
              aria-label={`Открыть рендер на весь экран: ${slide.title}`}
            >
              <img src={slide.image} alt={slide.title} loading="lazy" />
              <span className="slider-zoom-hint">Открыть на весь экран</span>
            </button>
          ))}
        </div>
        <button
          type="button"
          className="slider-nav slider-next"
          onClick={() => scrollByOne(1)}
          aria-label="Следующий рендер"
          disabled={activeIndex === total - 1}
        >
          ›
        </button>
      </div>
      <div className="slider-meta">
        <div className="slider-meta-text">
          <div className="section-kicker">{item.room}</div>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
        <div className="slider-counter">{activeIndex + 1} / {total}</div>
      </div>
    </section>
  );
}

function PlansPage() {
  return (
    <section className="section plans-grid">
      {plans.map((plan) => (
        <article className="plan-card" key={plan.title}>
          <div className="plan-meta">
            <div className="section-kicker">PDF · {plan.size}</div>
            <h2>{plan.title}</h2>
            <p>{plan.description}</p>
            <div className="tags">
              {plan.tags.map((tag) => (
                <span className="tag" key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <div className="plan-preview">
            <object data={`${plan.file}#toolbar=0&navpanes=0&scrollbar=0`} type="application/pdf" />
          </div>
          <div className="plan-actions">
            <a className="button-link cobalt" href={plan.file} target="_blank" rel="noreferrer">Открыть PDF</a>
            <a className="button-link" href={plan.file} download>Скачать</a>
          </div>
        </article>
      ))}
    </section>
  );
}

function MediaSection({ title, kicker, count, children }) {
  return (
    <section className="section card media-shell" style={{ "--card-accent": "#828747" }}>
      <div className="section-head">
        <div>
          <span className="section-kicker">{kicker}</span>
          <h2>{title}</h2>
        </div>
        <div className="meta-chip">{count}</div>
      </div>
      {children}
    </section>
  );
}

function RenderCard({ item, onOpen }) {
  return (
    <article className="render-card">
      <button className="render-trigger" onClick={onOpen} aria-label={`Открыть рендер: ${item.title}`}>
        <div className="render-thumb">
          <img src={item.image} alt={item.title} loading="lazy" />
        </div>
      </button>
      <div className="render-meta">
        <div className="section-kicker">{item.room}</div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <div className="tags">
          {item.tags.map((tag) => (
            <span className="tag" key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

function RenderLightbox({ item, index, total, onClose, onPrev, onNext }) {
  if (!item) return null;

  return (
    <div className="lightbox-overlay" role="dialog" aria-modal="true" aria-label={item.title} onClick={onClose}>
      <div className="lightbox-shell" onClick={(event) => event.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose} aria-label="Закрыть окно">
          Закрыть
        </button>
        <button
          type="button"
          className="lightbox-nav lightbox-prev"
          onClick={onPrev}
          aria-label="Предыдущий рендер"
        >
          ‹
        </button>
        <button
          type="button"
          className="lightbox-nav lightbox-next"
          onClick={onNext}
          aria-label="Следующий рендер"
        >
          ›
        </button>
        <div className="lightbox-image-wrap">
          <img className="lightbox-image" src={item.image} alt={item.title} />
        </div>
        <div className="lightbox-meta">
          <div className="lightbox-meta-row">
            <div className="section-kicker">{item.room}</div>
            <div className="lightbox-counter">{index + 1} / {total}</div>
          </div>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
