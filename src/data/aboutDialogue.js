export const ABOUT_DIALOGUE = {
  startNodeId: 'root',
  nodes: {
    root: {
      id: 'root',
      anim: 'Sitting',
      speaker: {
        ru: 'ТЫ (НА КОВРЕ)',
        en: 'YOU (ON THE RUG)',
      },
      text: {
        ru: 'Здарова. Проходи, не стой на сквозняке. Ковёр чистый — почти. Что хотел узнать: кто я, как дошёл до такого двора или почему я вообще здесь сижу?',
        en: 'Yo. Come on in, don’t block the draft. The rug’s clean — mostly. What do you want to know: who I am, how I ended up in this yard, or why I’m even sitting here?',
      },
      choices: [
        {
          id: 'why_sitting',
          label: {
            ru: 'Почему ты вообще здесь сидишь?',
            en: 'Why are you even sitting here?',
          },
          nextId: 'why_sitting_reply',
        },
        {
          id: 'who_am_i',
          label: {
            ru: 'Расскажи про опыт и стек',
            en: 'Tell me about your experience & stack',
          },
          nextId: 'career_reply',
        },
        {
          id: 'ps1_yard',
          label: {
            ru: 'Откуда этот PS1-двор и ковёр?',
            en: 'Where did this PS1 yard and rug come from?',
          },
          nextId: 'yard_lore_reply',
        },
        {
          id: 'go_locations',
          label: {
            ru: 'Пойдём глянем остальное во дворе',
            en: 'Let’s check the rest of the yard',
          },
          nextId: 'locations_hub',
        },
      ],
    },

    why_sitting_reply: {
      id: 'why_sitting_reply',
      anim: 'SittingDisapproval',
      speaker: {
        ru: 'ТЫ (НА КОВРЕ)',
        en: 'YOU (ON THE RUG)',
      },
      text: {
        ru: 'Жду, когда на нормальную работу возьмут, а пока греюсь у бочки и двигаю пиксели. В резюме вроде всё ровно, но HR иногда смотрит так, будто я пытаюсь закоммитить ковёр в прод.',
        en: 'Waiting to land a solid gig while warming up by the barrel and pushing pixels. Resume looks legit, yet HR sometimes stares like I’m trying to commit a rug to prod.',
      },
      choices: [
        {
          id: 'weird_question_1',
          label: {
            ru: 'А бочка не дымит в лицо?',
            en: 'Doesn’t the barrel smoke in your face?',
          },
          nextId: 'barrel_joke',
        },
        {
          id: 'back_to_career',
          label: {
            ru: 'Ладно, давай по делу — что умеешь?',
            en: 'Alright, seriously — what do you do?',
          },
          nextId: 'career_reply',
        },
        {
          id: 'back_root',
          label: {
            ru: 'Вернёмся к началу',
            en: 'Back to the start',
          },
          nextId: 'root',
        },
      ],
    },

    barrel_joke: {
      id: 'barrel_joke',
      anim: 'idle',
      speaker: {
        ru: 'ТЫ (НА КОВРЕ)',
        en: 'YOU (ON THE RUG)',
      },
      text: {
        ru: 'Дымит, но это бесплатный постпроцессинг. Зато кадры греет и атмосферу держит лучше любого корпоративного тимбилдинга.',
        en: 'It smokes, yeah, consider it free post-processing. Keeps the vibe alive better than any corporate team-building.',
      },
      choices: [
        {
          id: 'barrel_to_locations',
          label: {
            ru: 'Окей, куда дальше двигаем?',
            en: 'Fair enough, where next?',
          },
          nextId: 'locations_hub',
        },
        {
          id: 'barrel_to_root',
          label: {
            ru: 'Спрошу другое',
            en: 'Ask something else',
          },
          nextId: 'root',
        },
      ],
    },

    career_reply: {
      id: 'career_reply',
      anim: 'Sitting',
      speaker: {
        ru: 'ТЫ (НА КОВРЕ)',
        en: 'YOU (ON THE RUG)',
      },
      text: {
        ru: 'Делаю фронтенд и интерфейсы: React, TypeScript, Next.js, Vue, Three.js / WebGL, плюс бэк на Node.js и базы. А по образованию вообще ковырял железо и FPGA на SystemVerilog — поэтому люблю, когда всё работает чётко и без лишнего мусора.',
        en: 'I build frontend and UIs: React, TypeScript, Next.js, Vue, Three.js / WebGL, plus Node.js and databases on the backend. My background actually covers digital hardware and FPGA in SystemVerilog — so I like things clean and deterministic.',
      },
      choices: [
        {
          id: 'career_to_stack',
          label: {
            ru: 'Показать стек в телевизоре (02)',
            en: 'Show stack on the TV (02)',
          },
          actionLocation: 'stack',
        },
        {
          id: 'career_to_contacts',
          label: {
            ru: 'Скинуть контакты с телефона (04)',
            en: 'Grab contacts from the phone (04)',
          },
          actionLocation: 'contacts',
        },
        {
          id: 'career_more',
          label: {
            ru: 'А зачем тебе вообще ретро-3D?',
            en: 'Why bother with retro 3D at all?',
          },
          nextId: 'yard_lore_reply',
        },
      ],
    },

    yard_lore_reply: {
      id: 'yard_lore_reply',
      anim: 'Sitting',
      speaker: {
        ru: 'ТЫ (НА КОВРЕ)',
        en: 'YOU (ON THE RUG)',
      },
      text: {
        ru: 'Скучно делать одинаковые страницы с карточками и градиентами. В PS1 и старом дворе есть характер: низкое разрешение, жёсткие тени, живой свет от огня и ощущение, что ты попал в чужой район, а не в шаблон.',
        en: 'Generic landing pages with identical cards get boring fast. PS1 and a gritty yard have character: chunky pixels, harsh contrast, live firelight, and a place that feels like a real spot instead of a template.',
      },
      choices: [
        {
          id: 'lore_to_minigame',
          label: {
            ru: 'Заценить мини-игру на автомате (05)',
            en: 'Check the arcade mini-game (05)',
          },
          actionLocation: 'minigame',
        },
        {
          id: 'lore_to_locations',
          label: {
            ru: 'Выбрать другую точку',
            en: 'Pick another spot',
          },
          nextId: 'locations_hub',
        },
        {
          id: 'lore_to_root',
          label: {
            ru: 'В начало разговора',
            en: 'Back to beginning',
          },
          nextId: 'root',
        },
      ],
    },

    locations_hub: {
      id: 'locations_hub',
      anim: 'Sitting',
      speaker: {
        ru: 'ТЫ (НА КОВРЕ)',
        en: 'YOU (ON THE RUG)',
      },
      text: {
        ru: 'Выбирай, куда крутим камеру: телек со стеком, труба с контактами или аркадный автомат. Можно и кнопками внизу.',
        en: 'Pick where we point the camera: TV for the stack, phone for contacts, or the arcade cabinet. Bottom buttons work too.',
      },
      choices: [
        {
          id: 'hub_stack',
          label: {
            ru: '02. Стек и процесс (ТВ)',
            en: '02. Stack & Workflow (TV)',
          },
          actionLocation: 'stack',
        },
        {
          id: 'hub_contacts',
          label: {
            ru: '04. Контакты (Телефон)',
            en: '04. Contacts (Phone)',
          },
          actionLocation: 'contacts',
        },
        {
          id: 'hub_minigame',
          label: {
            ru: '05. Мини-игра (Автомат)',
            en: '05. Mini-Game (Arcade)',
          },
          actionLocation: 'minigame',
        },
        {
          id: 'hub_root',
          label: {
            ru: 'Ещё поболтать здесь',
            en: 'Chat a bit more here',
          },
          nextId: 'root',
        },
      ],
    },
  },
};