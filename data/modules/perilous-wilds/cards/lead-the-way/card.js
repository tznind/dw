window.CardInitializers['modules/perilous-wilds/cards/lead-the-way'] = function(container, suffix) {
    const helpers = window.CardHelpers.createScopedHelpers(container, suffix);

    const QUALITY_OPTIONS = [
        { label: '1–3: A liability — Quality -1, +0 tags',               value: '-1' },
        { label: '4–9: Reasonably competent — Quality 0, +1 tag',        value: '0'  },
        { label: '10–11: Fully capable — Quality +1, +2 tags',           value: '1'  },
        { label: '12: An exceptional individual — Quality +2, +4 tags',  value: '2'  },
    ];
    const QUALITY_LABELS = new Set(QUALITY_OPTIONS.map(o => o.label));
    const QUALITY_MAP = Object.fromEntries(QUALITY_OPTIONS.map(o => [o.label, o.value]));

    const HP_OPTIONS = [
        { label: '1–3: Weak / frail / soft — 3 HP',    value: '3/3' },
        { label: '4–9: Able-bodied — 6 HP',             value: '6/6' },
        { label: '10–12: Tough / strong / hard — 9 HP', value: '9/9' },
    ];
    const HP_LABELS = new Set(HP_OPTIONS.map(o => o.label));
    const HP_MAP = Object.fromEntries(HP_OPTIONS.map(o => [o.label, o.value]));

    const COST_OPTIONS = [
        '1: Debauchery',
        '2: Vengeance',
        '3–5: Lucre',
        '6–7: Renown',
        '8–9: Glory',
        '10: Affection',
        '11: Knowledge',
        '12: Good',
    ];

    const INSTINCT_OPTIONS = [
        { label: '1: Loot, pillage, and burn',          value: 'Pillage'      },
        { label: '2: Hold a grudge and seek payback',   value: 'Grudge'       },
        { label: '3: Question leadership or authority', value: 'Contrarian'   },
        { label: '4–5: Lord over others',               value: 'Domineering'  },
        { label: '6–7: Act impulsively',                value: 'Impulsive'    },
        { label: '8–9: Give in to temptation',          value: 'Temptation'   },
        { label: '10–11: Slack off',                    value: 'Slacker'      },
        { label: '12: Avoid danger or punishment',      value: 'Cowardly'     },
    ];
    const INSTINCT_LABELS = new Set(INSTINCT_OPTIONS.map(o => o.label));
    const INSTINCT_MAP = Object.fromEntries(INSTINCT_OPTIONS.map(o => [o.label, o.value]));

    const DAMAGE_OPTIONS = [
        { label: '1–4: Not very dangerous — d4',   value: 'd4' },
        { label: '5–10: Can defend themselves — d6', value: 'd6' },
        { label: '11–12: Veteran fighter — d8',     value: 'd8' },
    ];
    const DAMAGE_LABELS = new Set(DAMAGE_OPTIONS.map(o => o.label));
    const DAMAGE_MAP = Object.fromEntries(DAMAGE_OPTIONS.map(o => [o.label, o.value]));

    helpers.addEventListener('add-follower-btn', 'click', async () => {
        const result = await window.Wizard.show([
            {
                type: 'text',
                field: 'name',
                title: 'Name:',
                placeholder: 'Follower name...',
            },
            {
                type: 'pickOne',
                title: 'Quality (choose one, or roll 1d12)',
                options: QUALITY_OPTIONS.map(o => o.label),
            },
            {
                type: 'pickOne',
                title: 'Hit Points (choose one, or roll 1d12)',
                options: HP_OPTIONS.map(o => o.label),
            },
            {
                type: 'pickOne',
                title: 'Damage (choose one, or roll 1d12)',
                options: DAMAGE_OPTIONS.map(o => o.label),
            },
            {
                type: 'pickOne',
                title: 'Cost (choose one, or roll 1d12)',
                options: COST_OPTIONS,
            },
            {
                type: 'pickOne',
                title: 'Instinct (choose one, or roll 1d12)',
                options: INSTINCT_OPTIONS.map(o => o.label),
            },
            {
                type: 'text',
                field: 'tags',
                title: 'Tags:',
                placeholder: 'e.g. Loyal, Brave, Cautious...',
            },
        ], { title: 'New Follower (Abridged)' });

        if (result === null) return;

        const get = (field) => (result.find(r => r?.field === field)?.value ?? '');
        const name = get('name');
        const tags = get('tags');

        const strings = result.filter(r => typeof r === 'string');
        const qualityLabel = strings.find(r => QUALITY_LABELS.has(r));
        const quality = qualityLabel != null ? QUALITY_MAP[qualityLabel] : '';
        const hpLabel = strings.find(r => HP_LABELS.has(r));
        const hp = hpLabel != null ? HP_MAP[hpLabel] : '';
        const damageLabel = strings.find(r => DAMAGE_LABELS.has(r));
        const damage = damageLabel != null ? DAMAGE_MAP[damageLabel] : '';
        const costSet = new Set(COST_OPTIONS);
        const costRaw = strings.find(r => costSet.has(r));
        const cost = costRaw ? costRaw.split(': ').slice(1).join(': ') : '';

        const instinctLabel = strings.find(r => INSTINCT_LABELS.has(r));
        const instinct = instinctLabel != null ? INSTINCT_MAP[instinctLabel] : '';

        helpers.addTableRow('followers', { name, quality, hp, damage, cost, instinct, moves: tags });
    });
};
