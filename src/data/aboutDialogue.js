export const ABOUT_DIALOGUE = {
  startNodeId: 'root',
  nodes: {
    root: {
      id: 'root',
      anim: 'justSit',
      speaker: {
        ru: 'АНДРЕЙ БАРСУКОВ // БАРСУК',
        en: 'ANDREY BARSUKOV // BADGER',
      },
      text: {
        ru: 'Здарова. Андрей Барсуков, для своих — барсук. Проходи, не стой на сквозняке. Ковёр чистый — почти. Что хотел узнать: кто я, как дошёл до такого двора или почему я вообще здесь сижу?',
        en: 'Yo. Andrey Barsukov, or badger to people who know me. Come in, don’t block the draft. The rug’s clean — mostly. What do you want to know: who I am, how I ended up in this yard, or why I’m even sitting here?',
      },
      revisitText: {
        ru: 'Опять ты. Ковёр всё там же, сквозняк не поменялся. Что ещё спросим или куда крутим камеру?',
        en: 'You again. Rug’s still there, draft hasn’t changed. What else we asking or where do we point the camera?',
      },
      locationReactions: {
        contacts: {
          ru: 'Видел, подходил к трубе с контактами. Ну чё — звонить или писать будешь, или чисто приценился и пошёл дальше?',
          en: 'Saw you checking the phone and contacts. So — gonna call or message, or just sizing up the number and moving on?',
        },
        stack: {
          ru: 'Заценил телек со стеком? Основной упор у меня на фронтенд и интерфейсы — если есть задачи или команда на примете, маякуй.',
          en: 'Checked out the TV stack? My main focus is frontend and UI — if you’ve got tasks or a team in mind, hit me up.',
        },
        minigame: {
          ru: 'Ну как аркадный автомат? Не залип там на пару часов вместо просмотра остального?',
          en: 'How’s the arcade cabinet? Didn’t get stuck there for a couple hours instead of checking the rest?',
        },
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
            ru: 'Расскажи про опыт, фронтенд и платы',
            en: 'Tell me about experience, frontend & boards',
          },
          nextId: 'career_reply',
        },
        {
          id: 'work_status',
          label: {
            ru: 'Ищешь работу или подработку?',
            en: 'Looking for full-time or side gigs?',
          },
          nextId: 'work_status_reply',
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
        ru: 'АНДРЕЙ БАРСУКОВ // БАРСУК',
        en: 'ANDREY BARSUKOV // BADGER',
      },
      text: {
        ru: 'Жду, когда на нормальную работу возьмут, а пока греюсь у бочки и двигаю пиксели. В резюме вроде всё ровно, но иногда ощущение, что я пытаюсь закоммитить ковёр в прод.',
        en: 'Waiting to land a solid gig while warming up by the barrel and pushing pixels. Resume looks legit, yet sometimes it feels like I’m trying to commit a rug to prod.',
      },
      revisitText: {
        ru: 'Да всё то же самое: ищу фулл-тайм, параллельно не против подработки, пока греюсь у бочки.',
        en: 'Same deal: looking for full-time, open to side gigs on the side while warming up by the barrel.',
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
          id: 'sitting_to_work',
          label: {
            ru: 'Насчёт фулл-тайма и подработки поподробнее',
            en: 'More on full-time and side gigs',
          },
          nextId: 'work_status_reply',
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
      anim: 'justSit',
      speaker: {
        ru: 'АНДРЕЙ БАРСУКОВ // БАРСУК',
        en: 'ANDREY BARSUKOV // BADGER',
      },
      text: {
        ru: 'Дымит, но это бесплатный постпроцессинг. Зато кадры греет и атмосферу держит лучше любого корпоративного тимбилдинга и созвонов на час ни о чём.',
        en: 'It smokes, yeah, consider it free post-processing. Keeps the vibe alive better than any corporate team-building or one-hour sync about nothing.',
      },
      revisitText: {
        ru: 'Дым всё так же крутит — бесплатный постпроцессинг без лишних затрат.',
        en: 'Still smoking — free post-processing at zero extra cost.',
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
        ru: 'АНДРЕЙ БАРСУКОВ // БАРСУК',
        en: 'ANDREY BARSUKOV // BADGER',
      },
      text: {
        ru: 'Основной упор — фронтенд и интерфейсы: React, TypeScript, Next.js, Vue, анимации и Three.js / WebGL, плюс бэк на Node.js и базы. А по образованию вообще ковырял железо, платы и FPGA на SystemVerilog — поэтому люблю, когда всё работает чётко и без лишнего мусора.',
        en: 'Main focus is frontend and UI: React, TypeScript, Next.js, Vue, animations, and Three.js / WebGL, plus Node.js and databases on the backend. My degree is actually in hardware, boards, and FPGA in SystemVerilog — so I like things clean and deterministic.',
      },
      revisitText: {
        ru: 'Коротко: делаю фронтенд и интерфейсы (включая 3D), а платы и FPGA — это по образованию. Никакого лишнего хлама.',
        en: 'In short: frontend and UI (including 3D), while boards and FPGA are from my degree. No unnecessary bloat.',
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

    work_status_reply: {
      id: 'work_status_reply',
      anim: 'Sitting',
      speaker: {
        ru: 'АНДРЕЙ БАРСУКОВ // БАРСУК',
        en: 'ANDREY BARSUKOV // BADGER',
      },
      text: {
        ru: 'Ищу фулл-тайм на фронтенд и интерфейсы, но если есть живая подработка или конкретная задача — тоже готов подключиться. Заходи к телефону (04), если по делу.',
        en: 'Looking for full-time in frontend and UI, though if there’s a solid side gig or a concrete task, I’m down to hop in too. Check the phone (04) if you’ve got something real.',
      },
      revisitText: {
        ru: 'Фулл-тайм ищу в первую очередь, подработку тоже рассматриваю. Барсук на связи.',
        en: 'Full-time is first priority, side gigs are open too. Badger’s around.',
      },
      choices: [
        {
          id: 'work_to_contacts',
          label: {
            ru: 'Пойти к телефону за контактами (04)',
            en: 'Head to the phone for contacts (04)',
          },
          actionLocation: 'contacts',
        },
        {
          id: 'work_to_root',
          label: {
            ru: 'Вернуться к началу',
            en: 'Back to the start',
          },
          nextId: 'root',
        },
      ],
    },

    yard_lore_reply: {
      id: 'yard_lore_reply',
      anim: 'Sitting',
      speaker: {
        ru: 'АНДРЕЙ БАРСУКОВ // БАРСУК',
        en: 'ANDREY BARSUKOV // BADGER',
      },
      text: {
        ru: 'Скучно делать одинаковые страницы с карточками и градиентами. В PS1 и старом дворе есть характер: низкое разрешение, жёсткие тени, живой свет от огня и ощущение, что ты попал в чужой район, а не в шаблон.',
        en: 'Generic landing pages with identical cards get boring fast. PS1 and a gritty yard have character: chunky pixels, harsh contrast, live firelight, and a place that feels like a real spot instead of a template.',
      },
      revisitText: {
        ru: 'Всё так же: живой двор вместо скучного шаблона. Можем глянуть аркаду или другие точки.',
        en: 'Same thing: a living yard instead of a dull template. We can check the arcade or other spots.',
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
      anim: 'justSit',
      speaker: {
        ru: 'АНДРЕЙ БАРСУКОВ // БАРСУК',
        en: 'ANDREY BARSUKOV // BADGER',
      },
      text: {
        ru: 'Выбирай, куда крутим камеру: телек со стеком, труба с контактами или аркадный автомат. Можно и кнопками внизу.',
        en: 'Pick where we point the camera: TV for the stack, phone for contacts, or the arcade cabinet. Bottom buttons work too.',
      },
      revisitText: {
        ru: 'Куда теперь крутим? Телек, телефон или автомат.',
        en: 'Where to next? TV, phone, or cabinet.',
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