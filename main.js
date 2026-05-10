// ========== FONDO ANIMADO DE MALLA DE DEGRADADOS CON MATIZ POR TURNO ==========
class GradientMeshBackground {
    constructor() {
        this.canvas = document.getElementById('gradientMesh');
        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.numNodesX = 8;
        this.numNodesY = 6;
        this.time = 0;

        // Control de matiz por equipo
        this.currentHueShift = 0;      // valor actual interpolado
        this.targetHueShift = 0;       // valor objetivo (-35 para azul, +45 para rojo)

        this.resize();
        this.initNodes();
        this.animate();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        if (this.nodes.length > 0) {
            this.updateBasePositions();
        }
    }

    updateBasePositions() {
        let idx = 0;
        for (let i = 0; i < this.numNodesX; i++) {
            for (let j = 0; j < this.numNodesY; j++) {
                if (idx < this.nodes.length) {
                    this.nodes[idx].baseX = (i / (this.numNodesX - 1)) * this.canvas.width;
                    this.nodes[idx].baseY = (j / (this.numNodesY - 1)) * this.canvas.height;
                }
                idx++;
            }
        }
    }

    initNodes() {
        this.nodes = [];
        for (let i = 0; i < this.numNodesX; i++) {
            for (let j = 0; j < this.numNodesY; j++) {
                this.nodes.push({
                    baseX: (i / (this.numNodesX - 1)) * this.canvas.width,
                    baseY: (j / (this.numNodesY - 1)) * this.canvas.height,
                    x: 0, y: 0,
                    hue: 210 + Math.random() * 90,       // 210°–300°
                    saturation: 55 + Math.random() * 40,
                    lightness: 12 + Math.random() * 22,
                    amplitude: 30 + Math.random() * 70,
                    frequency: 0.3 + Math.random() * 0.7,
                    phase: Math.random() * Math.PI * 2,
                    radius: 200 + Math.random() * 380
                });
            }
        }
    }

    // Método público para cambiar el matiz según el equipo
    setTeam(team) {
        if (team === 'blue') {
            this.targetHueShift = -35;   // tiñe hacia azul profundo
        } else if (team === 'red') {
            this.targetHueShift = 45;    // tiñe hacia rojo intenso
        } else {
            this.targetHueShift = 0;     // neutro (swap mode u otros)
        }
    }

    animate() {
        this.time += 0.003;

        // Interpolar suavemente el matiz actual hacia el objetivo
        this.currentHueShift += (this.targetHueShift - this.currentHueShift) * 0.015;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#0a0c1a';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        for (const node of this.nodes) {
            node.x = node.baseX + Math.sin(this.time * node.frequency + node.phase) * node.amplitude;
            node.y = node.baseY + Math.cos(this.time * node.frequency * 1.3 + node.phase) * node.amplitude * 0.7;

            const hueShift = Math.sin(this.time * 0.5 + node.phase) * 18;
            // Sumamos el desplazamiento global de equipo
            const currentHue = node.hue + hueShift + this.currentHueShift;
            const currentLightness = node.lightness + Math.cos(this.time * 0.4 + node.phase) * 6;

            const gradient = this.ctx.createRadialGradient(
                node.x, node.y, 0,
                node.x, node.y, node.radius
            );

            const centerColor = `hsla(${currentHue}, ${node.saturation}%, ${currentLightness}%, 0.65)`;
            const edgeColor = `hsla(${currentHue}, ${node.saturation}%, ${currentLightness}%, 0)`;

            gradient.addColorStop(0, centerColor);
            gradient.addColorStop(1, edgeColor);

            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(
                node.x - node.radius,
                node.y - node.radius,
                node.radius * 2,
                node.radius * 2
            );
        }

        requestAnimationFrame(() => this.animate());
    }
}

// --- MOCK DATA ---
const champions = [
    { id: 1, name: "Aatrox", role: "tank", icon: "⚔️" },
    { id: 2, name: "Ahri", role: "mage", icon: "🦊" },
    { id: 3, name: "Akali", role: "assassin", icon: "🥷" },
    { id: 4, name: "Akshan", role: "assassin", icon: "🪃" },
    { id: 5, name: "Alistar", role: "tank", icon: "🐂" },
    { id: 6, name: "Ambessa", role: "assassin", icon: "⚡" },
    { id: 7, name: "Amumu", role: "tank", icon: "😢" },
    { id: 8, name: "Annie", role: "mage", icon: "🧸" },
    { id: 9, name: "Ashe", role: "carry", icon: "🏹" },
    { id: 10, name: "Aurelion Sol", role: "mage", icon: "🐉" },
    { id: 11, name: "Aurora", role: "mage", icon: "🌌" },
    { id: 12, name: "Azir", role: "mage", icon: "👑" },
    { id: 13, name: "Bardo", role: "supp", icon: "🎵" },
    { id: 14, name: "Blitzcrank", role: "tank", icon: "🤖" },
    { id: 15, name: "Brand", role: "mage", icon: "🔥" },
    { id: 16, name: "Braum", role: "tank", icon: "🛡️" },
    { id: 17, name: "Caitlyn", role: "carry", icon: "🎯" },
    { id: 18, name: "Camille", role: "assassin", icon: "⚙️" },
    { id: 19, name: "Corki", role: "carry", icon: "✈️" },
    { id: 20, name: "Darius", role: "tank", icon: "🪓" },
    { id: 21, name: "Diana", role: "assassin", icon: "🌙" },
    { id: 22, name: "Dr. Mundo", role: "tank", icon: "💉" },
    { id: 23, name: "Draven", role: "carry", icon: "🪓" },
    { id: 24, name: "Ekko", role: "assassin", icon: "⏱️" },
    { id: 25, name: "Evelynn", role: "assassin", icon: "👄" },
    { id: 26, name: "Ezreal", role: "carry", icon: "💎" },
    { id: 27, name: "Fiddlesticks", role: "mage", icon: "🎃" },
    { id: 28, name: "Fiora", role: "assassin", icon: "🌹" },
    { id: 29, name: "Fizz", role: "assassin", icon: "🐟" },
    { id: 30, name: "Galio", role: "tank", icon: "🗿" },
    { id: 31, name: "Garen", role: "tank", icon: "⚔️" },
    { id: 32, name: "Gnar", role: "tank", icon: "🦖" },
    { id: 33, name: "Gragas", role: "tank", icon: "🍺" },
    { id: 34, name: "Graves", role: "carry", icon: "🔫" },
    { id: 35, name: "Gwen", role: "assassin", icon: "✂️" },
    { id: 36, name: "Hecarim", role: "tank", icon: "🐴" },
    { id: 37, name: "Heimerdinger", role: "mage", icon: "🔧" },
    { id: 38, name: "Irelia", role: "assassin", icon: "⚔️" },
    { id: 39, name: "Janna", role: "supp", icon: "🌪️" },
    { id: 40, name: "Jarvan IV", role: "tank", icon: "🚩" },
    { id: 41, name: "Jax", role: "assassin", icon: "👊" },
    { id: 42, name: "Jayce", role: "carry", icon: "🔨" },
    { id: 43, name: "Jhin", role: "carry", icon: "🎭" },
    { id: 44, name: "Jinx", role: "carry", icon: "🤪" },
    { id: 45, name: "K'Sante", role: "tank", icon: "🛡️" },
    { id: 46, name: "Kai'Sa", role: "carry", icon: "👽" },
    { id: 47, name: "Kalista", role: "carry", icon: "👻" },
    { id: 48, name: "Kassadin", role: "mage", icon: "🌌" },
    { id: 49, name: "Katarina", role: "assassin", icon: "🗡️" },
    { id: 50, name: "Kayle", role: "carry", icon: "👼" },
    { id: 51, name: "Kayn", role: "assassin", icon: "🔥" },
    { id: 52, name: "Kennen", role: "mage", icon: "⚡" },
    { id: 53, name: "Kha'Zix", role: "assassin", icon: "🦗" },
    { id: 54, name: "Kindred", role: "carry", icon: "🐑" },
    { id: 55, name: "Kog'Maw", role: "carry", icon: "👁️" },
    { id: 56, name: "Karma", role: "supp", icon: "☯️" },
    { id: 57, name: "Lee Sin", role: "assassin", icon: "🥋" },
    { id: 58, name: "Leona", role: "tank", icon: "☀️" },
    { id: 59, name: "Lillia", role: "tank", icon: "🦌" },
    { id: 60, name: "Lissandra", role: "mage", icon: "❄️" },
    { id: 61, name: "Lucian", role: "carry", icon: "🔫" },
    { id: 62, name: "Lulu", role: "supp", icon: "🧚" },
    { id: 63, name: "Lux", role: "mage", icon: "💫" },
    { id: 64, name: "Maestro Yi", role: "assassin", icon: "🗡️" },
    { id: 65, name: "Malphite", role: "tank", icon: "🪨" },
    { id: 66, name: "Maokai", role: "tank", icon: "🌳" },
    { id: 67, name: "Mel", role: "mage", icon: "✨" },
    { id: 68, name: "Milio", role: "supp", icon: "🔥" },
    { id: 69, name: "Miss Fortune", role: "carry", icon: "💰" },
    { id: 70, name: "Mordekaiser", role: "tank", icon: "💀" },
    { id: 71, name: "Morgana", role: "mage", icon: "😈" },
    { id: 72, name: "Nami", role: "supp", icon: "🌊" },
    { id: 73, name: "Nasus", role: "tank", icon: "🐕" },
    { id: 74, name: "Nautilus", role: "tank", icon: "⚓" },
    { id: 75, name: "Nidalee", role: "assassin", icon: "🐆" },
    { id: 76, name: "Nilah", role: "carry", icon: "💧" },
    { id: 77, name: "Nocturne", role: "assassin", icon: "🌑" },
    { id: 78, name: "Norra", role: "mage", icon: "📚" },
    { id: 79, name: "Nunu y Willump", role: "tank", icon: "⛄" },
    { id: 80, name: "Olaf", role: "tank", icon: "🪓" },
    { id: 81, name: "Orianna", role: "mage", icon: "🎱" },
    { id: 82, name: "Ornn", role: "tank", icon: "🔨" },
    { id: 83, name: "Pantheon", role: "assassin", icon: "🛡️" },
    { id: 84, name: "Poppy", role: "tank", icon: "🔨" },
    { id: 85, name: "Pyke", role: "assassin", icon: "🪝" },
    { id: 86, name: "Rakan", role: "supp", icon: "💃" },
    { id: 87, name: "Rammus", role: "tank", icon: "🐢" },
    { id: 88, name: "Rell", role: "tank", icon: "🏇" },
    { id: 89, name: "Renekton", role: "tank", icon: "🐊" },
    { id: 90, name: "Rengar", role: "assassin", icon: "🐱" },
    { id: 91, name: "Riven", role: "assassin", icon: "⚔️" },
    { id: 92, name: "Rumble", role: "mage", icon: "🤖" },
    { id: 93, name: "Ryze", role: "mage", icon: "📜" },
    { id: 94, name: "Samira", role: "carry", icon: "🌀" },
    { id: 95, name: "Senna", role: "supp", icon: "👻" },
    { id: 96, name: "Seraphine", role: "mage", icon: "🎤" },
    { id: 97, name: "Sett", role: "tank", icon: "👊" },
    { id: 98, name: "Shen", role: "tank", icon: "🗡️" },
    { id: 99, name: "Shyvana", role: "tank", icon: "🐉" },
    { id: 100, name: "Singed", role: "tank", icon: "🧪" },
    { id: 101, name: "Sion", role: "tank", icon: "⚔️" },
    { id: 102, name: "Sivir", role: "carry", icon: "🌀" },
    { id: 103, name: "Smolder", role: "carry", icon: "🔥" },
    { id: 104, name: "Sona", role: "supp", icon: "🎵" },
    { id: 105, name: "Soraka", role: "supp", icon: "⭐" },
    { id: 106, name: "Swain", role: "mage", icon: "🦅" },
    { id: 107, name: "Syndra", role: "mage", icon: "🔮" },
    { id: 108, name: "Talon", role: "assassin", icon: "🗡️" },
    { id: 109, name: "Teemo", role: "mage", icon: "🍄" },
    { id: 110, name: "Thresh", role: "supp", icon: "⛓️" },
    { id: 111, name: "Tristana", role: "carry", icon: "🚀" },
    { id: 112, name: "Tryndamere", role: "assassin", icon: "⚔️" },
    { id: 113, name: "Twisted Fate", role: "mage", icon: "🎴" },
    { id: 114, name: "Twitch", role: "carry", icon: "🐭" },
    { id: 115, name: "Urgot", role: "tank", icon: "🦀" },
    { id: 116, name: "Varus", role: "carry", icon: "🏹" },
    { id: 117, name: "Vayne", role: "carry", icon: "⚔️" },
    { id: 118, name: "Veigar", role: "mage", icon: "🧙" },
    { id: 119, name: "Vel'Koz", role: "mage", icon: "👁️" },
    { id: 120, name: "Vex", role: "mage", icon: "😈" },
    { id: 121, name: "Vi", role: "assassin", icon: "👊" },
    { id: 122, name: "Viego", role: "assassin", icon: "👑" },
    { id: 123, name: "Viktor", role: "mage", icon: "🔧" },
    { id: 124, name: "Vladimir", role: "mage", icon: "🩸" },
    { id: 125, name: "Volibear", role: "tank", icon: "⚡" },
    { id: 126, name: "Warwick", role: "tank", icon: "🐺" },
    { id: 127, name: "Wukong", role: "assassin", icon: "🐵" },
    { id: 128, name: "Xayah", role: "carry", icon: "🪶" },
    { id: 129, name: "Xin Zhao", role: "assassin", icon: "🗡️" },
    { id: 130, name: "Yasuo", role: "assassin", icon: "🌪️" },
    { id: 131, name: "Yone", role: "assassin", icon: "🗡️" },
    { id: 132, name: "Yuumi", role: "supp", icon: "🐱" },
    { id: 133, name: "Zed", role: "assassin", icon: "🥷" },
    { id: 134, name: "Zeri", role: "carry", icon: "⚡" },
    { id: 135, name: "Ziggs", role: "mage", icon: "💣" },
    { id: 136, name: "Zilean", role: "supp", icon: "⏳" },
    { id: 137, name: "Zoe", role: "mage", icon: "🌟" },
    { id: 138, name: "Zyra", role: "mage", icon: "🌿" }
];

// --- PLAYER DATA (ORDEN: TOP → JUNGL → MID → ADC → SUPPORT) ---
const blueTeamPlayers = [
    { name: "TopBeast", role: "Top", initials: "TOP", logo: "🛡️" },
    { name: "JunglerPro", role: "Jungle", initials: "JGL", logo: "🌲" },
    { name: "MidKing", role: "Mid", initials: "MID", logo: "⚡" },
    { name: "AdcMachine", role: "ADC", initials: "ADC", logo: "🏹" },
    { name: "SuppLegend", role: "Support", initials: "SUP", logo: "💚" }
];

const redTeamPlayers = [
    { name: "IronWall", role: "Top", initials: "TOP", logo: "🧱" },
    { name: "DarkSlayer", role: "Jungle", initials: "JGL", logo: "🗡️" },
    { name: "ShadowMage", role: "Mid", initials: "MID", logo: "🔮" },
    { name: "SniperElite", role: "ADC", initials: "ADC", logo: "🎯" },
    { name: "HealerGod", role: "Support", initials: "SUP", logo: "✨" }
];

// --- DRAFT SEQUENCE (20 turns) ---
const draftTurns = [
    { type: 'ban', team: 'blue', action: 'BAN Azul 1' },
    { type: 'ban', team: 'red', action: 'BAN Rojo 1' },
    { type: 'ban', team: 'blue', action: 'BAN Azul 2' },
    { type: 'ban', team: 'red', action: 'BAN Rojo 2' },
    { type: 'ban', team: 'blue', action: 'BAN Azul 3' },
    { type: 'ban', team: 'red', action: 'BAN Rojo 3' },
    { type: 'pick', team: 'blue', action: 'PICK Azul 1' },
    { type: 'pick', team: 'red', action: 'PICK Rojo 1' },
    { type: 'pick', team: 'red', action: 'PICK Rojo 2' },
    { type: 'pick', team: 'blue', action: 'PICK Azul 2' },
    { type: 'pick', team: 'blue', action: 'PICK Azul 3' },
    { type: 'pick', team: 'red', action: 'PICK Rojo 3' },
    { type: 'ban', team: 'red', action: 'BAN Rojo 4' },
    { type: 'ban', team: 'blue', action: 'BAN Azul 4' },
    { type: 'ban', team: 'red', action: 'BAN Rojo 5' },
    { type: 'ban', team: 'blue', action: 'BAN Azul 5' },
    { type: 'pick', team: 'red', action: 'PICK Rojo 4' },
    { type: 'pick', team: 'blue', action: 'PICK Azul 4' },
    { type: 'pick', team: 'blue', action: 'PICK Azul 5' },
    { type: 'pick', team: 'red', action: 'PICK Rojo 5' }
];

// --- ESTADO ---
let currentTurnIndex = 0;
let blueBans = [null, null, null, null, null];
let redBans = [null, null, null, null, null];
let blueTeam = new Array(5).fill(null);
let redTeam = new Array(5).fill(null);
let bannedChampions = new Set();
let selectedChampions = new Set();
let draftPhase = 'draft';
let draftLog = [];
let swapMode = { isSwapping: false, firstSlot: null, team: null };

// --- TIMER STATE ---
let blueTimerSeconds = 0;
let redTimerSeconds = 0;
let currentTimerInterval = null;
let currentActiveTeam = null;

// --- REFERENCIAS DOM ---
const championGrid = document.getElementById('championGrid');
const blueTeamDiv = document.getElementById('blueTeam');
const redTeamDiv = document.getElementById('redTeam');
const blueBansDiv = document.getElementById('blueBans');
const redBansDiv = document.getElementById('redBans');
const blueTimerDiv = document.getElementById('blueTimer');
const redTimerDiv = document.getElementById('redTimer');
const draftStatus = document.getElementById('draftStatus');
const turnIndicator = document.getElementById('turnIndicator');
const searchInput = document.getElementById('searchInput');
const roleButtons = document.querySelectorAll('.role-btn');
const swapInstructions = document.getElementById('swapInstructions');
const swapOptions = document.getElementById('swapOptions');
const historyModal = document.getElementById('historyModal');
const historyList = document.getElementById('historyList');

// --- HISTORIAL DE DRAFTS ---
const DRAFT_HISTORY_KEY = 'draftHistory';

function getDraftHistory() {
    const history = localStorage.getItem(DRAFT_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
}

function saveDraftHistory(history) {
    localStorage.setItem(DRAFT_HISTORY_KEY, JSON.stringify(history));
}

function saveCurrentDraft() {
    const history = getDraftHistory();

    const blueBansIds = blueBans
        .filter(id => id !== null && id !== undefined)
        .map(id => Number(id));

    const redBansIds = redBans
        .filter(id => id !== null && id !== undefined)
        .map(id => Number(id));

    const draftRecord = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        draftLog: [...draftLog],
        blueBans: blueBansIds,
        redBans: redBansIds,
        bluePicks: blueTeam.filter(Boolean),
        redPicks: redTeam.filter(Boolean)
    };

    history.unshift(draftRecord);
    if (history.length > 20) history.pop();
    saveDraftHistory(history);

    return draftRecord;
}

function deleteDraftRecord(id) {
    let history = getDraftHistory();
    history = history.filter(record => record.id !== id);
    saveDraftHistory(history);
    renderHistory();
}

function renderPicks(picks) {
    if (!picks || picks.length === 0) {
        return '<p style="color: var(--text-muted); font-style: italic;">Sin picks</p>';
    }

    const validPicks = picks.filter(pick => pick && pick.name && pick.icon);

    if (validPicks.length === 0) {
        return '<p style="color: var(--text-muted); font-style: italic;">Sin picks</p>';
    }

    return `<div class="draft-picks">${validPicks.map((pick, i) => `
        <div class="draft-pick">
            <span class="draft-pick-icon">${pick.icon}</span>
            <span>${i + 1}. ${pick.name}</span>
        </div>
    `).join('')}</div>`;
}

function renderHistoryPicks(picks, team, recordIndex) {
    if (!picks || picks.length === 0) {
        return '<p style="color: var(--text-muted); font-style: italic;">Sin picks</p>';
    }

    const validPicks = picks.filter(pick => pick && pick.name && pick.icon);
    if (validPicks.length === 0) {
        return '<p style="color: var(--text-muted); font-style: italic;">Sin picks</p>';
    }

    const record = getDraftHistory()[recordIndex];
    const pickActions = (record.draftLog || []).filter(a => a.type === 'pick' && a.team === team);

    return `<div class="history-picks">${validPicks.map((pick, i) => {
        const seqNum = pickActions[i] ? pickActions[i].turn : (team === 'blue' ? i * 2 + 7 : i * 2 + 8);
        return `
            <div class="history-item pick">
                <span class="history-seq">${seqNum}</span>
                <span class="history-icon">${pick.icon}</span>
                <span class="history-name">${pick.name}</span>
            </div>
        `;
    }).join('')}</div>`;
}

function renderHistoryBans(banIds, team, recordIndex) {
    const record = getDraftHistory()[recordIndex];

    const bans = banIds
        .filter(id => id !== null && id !== undefined)
        .map(id => {
            const numId = Number(id);
            return champions.find(c => c.id === numId);
        })
        .filter(Boolean);

    if (bans.length === 0) {
        return '<p style="color: var(--text-muted); font-style: italic;">Sin bans</p>';
    }

    const banActions = (record.draftLog || []).filter(a => a.type === 'ban' && a.team === team);

    return `<div class="history-bans">${bans.map((ban, i) => {
        const seqNum = banActions[i] ? banActions[i].turn : (team === 'blue' ? i * 2 + 1 : i * 2 + 2);
        return `
            <div class="history-item ban">
                <span class="history-seq">${seqNum}</span>
                <span class="history-icon">${ban.icon}</span>
                <span class="history-name">${ban.name}</span>
            </div>
        `;
    }).join('')}</div>`;
}

function toggleDraftView(index) {
    const isBans = document.getElementById(`toggle-${index}`).checked;
    const record = getDraftHistory()[index];
    const blueContent = document.getElementById(`blue-content-${index}`);
    const redContent = document.getElementById(`red-content-${index}`);

    if (isBans) {
        blueContent.innerHTML = renderHistoryBans(record.blueBans, 'blue', index);
        redContent.innerHTML = renderHistoryBans(record.redBans, 'red', index);
    } else {
        blueContent.innerHTML = renderHistoryPicks(record.bluePicks, 'blue', index);
        redContent.innerHTML = renderHistoryPicks(record.redPicks, 'red', index);
    }
}

function renderHistory() {
    const history = getDraftHistory();

    if (history.length === 0) {
        historyList.innerHTML = '<p class="no-history">No hay drafts guardados</p>';
        return;
    }

    historyList.innerHTML = history.map((record, index) => `
        <div class="draft-record">
            <div class="draft-record-header">
                <span class="draft-date">${record.date}</span>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <label class="view-toggle">
                        <span>Picks</span>
                        <label class="switch">
                            <input type="checkbox" onchange="toggleDraftView(${index})" id="toggle-${index}">
                            <span class="slider"></span>
                        </label>
                        <span>Bans</span>
                    </label>
                    <button class="draft-delete" onclick="deleteDraftRecord(${record.id})">Eliminar</button>
                </div>
            </div>
            <div class="draft-teams-grid">
                <div class="draft-team-section">
                    <h4 style="color: var(--team-blue)">⚔️ Equipo Azul</h4>
                    <div class="team-content" id="blue-content-${index}">
                        ${renderHistoryPicks(record.bluePicks, 'blue', index)}
                    </div>
                </div>
                <div class="draft-team-section">
                    <h4 style="color: var(--team-red)">🔥 Equipo Rojo</h4>
                    <div class="team-content" id="red-content-${index}">
                        ${renderHistoryPicks(record.redPicks, 'red', index)}
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function toggleHistory() {
    const isActive = historyModal.classList.contains('active');
    if (isActive) {
        historyModal.classList.remove('active');
    } else {
        renderHistory();
        historyModal.classList.add('active');
    }
}

function openSwapOptions() {
    swapOptions.classList.add('active');
}

function closeSwapOptions() {
    swapOptions.classList.remove('active');
}

function resetDraftState() {
    currentTurnIndex = 0;
    blueBans = [null, null, null, null, null];
    redBans = [null, null, null, null, null];
    blueTeam = new Array(5).fill(null);
    redTeam = new Array(5).fill(null);
    bannedChampions = new Set();
    selectedChampions = new Set();
    draftPhase = 'draft';
    draftLog = [];
    swapMode = { isSwapping: false, firstSlot: null, team: null };
    swapInstructions.classList.remove('active');
    swapOptions.classList.remove('active');

    stopTimer();
    blueTimerSeconds = 0;
    redTimerSeconds = 0;
    blueTimerDiv.textContent = '00:00';
    redTimerDiv.textContent = '00:00';
    blueTimerDiv.classList.remove('active', 'paused');
    redTimerDiv.classList.remove('active', 'paused');
}

function restartDraft() {
    resetDraftState();
    if (window.meshBackground) window.meshBackground.setTeam('blue');
    init();
}

function saveAndRestart() {
    saveCurrentDraft();
    resetDraftState();
    init();
}

// --- ORDENAR CAMPEONES ALFABÉTICAMENTE ---
champions.sort((a, b) => a.name.localeCompare(b.name));

// --- INICIALIZACIÓN ---
function init() {
    renderChampions();
    renderBans();
    renderTeams();
    updateDraftStatus();
}

// --- RENDERIZAR CAMPEONES ---
function renderChampions() {
    championGrid.innerHTML = '';
    const filtered = getFilteredChampions();

    filtered.forEach(champ => {
        const card = document.createElement('div');
        card.classList.add('champion-card');

        if (draftPhase === 'draft') {
            if (bannedChampions.has(champ.id)) {
                card.classList.add('banned');
            } else if (selectedChampions.has(champ.id)) {
                card.classList.add('disabled');
            } else if (draftTurns[currentTurnIndex].type === 'ban' && draftTurns[currentTurnIndex].team !== currentTeam()) {
                card.style.cursor = 'not-allowed';
            }
        }

        card.innerHTML = `
            <div class="champion-avatar">${champ.icon}</div>
            <div class="champion-name">${champ.name}</div>
            <div class="champion-role">${champ.role}</div>
        `;

        card.addEventListener('click', () => handleChampionClick(champ));
        championGrid.appendChild(card);
    });
}

// --- RENDERIZAR BANS ---
function renderBans() {
    blueBansDiv.innerHTML = '';
    redBansDiv.innerHTML = '';

    const currentTurn = draftTurns[currentTurnIndex];
    const isBanPhase = currentTurn?.type === 'ban';

    const blueBanCount = blueBans.filter(b => b !== null).length;
    const redBanCount = redBans.filter(b => b !== null).length;

    blueBans.forEach((ban, index) => {
        const slot = document.createElement('div');
        slot.classList.add('team-ban-slot');
        if (ban) {
            slot.classList.add('filled');
            const champ = champions.find(c => c.id === ban);
            slot.innerHTML = champ.icon;
            slot.title = champ.name;
        } else if (isBanPhase && currentTurn.team === 'blue' && index === blueBanCount) {
            slot.classList.add('active');
        }
        blueBansDiv.appendChild(slot);
    });

    redBans.forEach((ban, index) => {
        const slot = document.createElement('div');
        slot.classList.add('team-ban-slot');
        if (ban) {
            slot.classList.add('filled');
            const champ = champions.find(c => c.id === ban);
            slot.innerHTML = champ.icon;
            slot.title = champ.name;
        } else if (isBanPhase && currentTurn.team === 'red' && index === redBanCount) {
            slot.classList.add('active');
        }
        redBansDiv.appendChild(slot);
    });
}

// --- RENDERIZAR EQUIPOS ---
function renderTeams() {
    blueTeamDiv.innerHTML = '';
    redTeamDiv.innerHTML = '';

    blueTeam.forEach((champ, index) => {
        const slot = createTeamSlot(champ, 'blue', index);
        blueTeamDiv.appendChild(slot);
    });

    redTeam.forEach((champ, index) => {
        const slot = createTeamSlot(champ, 'red', index);
        redTeamDiv.appendChild(slot);
    });
}

function createTeamSlot(champ, team, index) {
    const slot = document.createElement('div');
    slot.classList.add('team-slot');
    slot.dataset.team = team;
    slot.dataset.index = index;

    const player = team === 'blue' ? blueTeamPlayers[index] : redTeamPlayers[index];

    const currentTurn = draftTurns[currentTurnIndex];
    const isPickPhase = currentTurn?.type === 'pick';
    const teamArray = team === 'blue' ? blueTeam : redTeam;
    const pickCount = teamArray.filter(c => c !== null).length;
    const isActiveSlot = isPickPhase &&
        currentTurn.team === team &&
        !champ &&
        index === pickCount;

    if (champ) {
        slot.classList.add('filled');
        slot.innerHTML = `
            <div class="player-info">
                <span class="player-name">${player.name}</span>
                <span class="player-role">${player.role} <span class="role-emoji ${champ.role}"></span></span>
            </div>
            <div class="slot-content">
                <div class="slot-avatar">${champ.icon}</div>
                <div class="slot-info">
                    <div class="slot-name">${champ.name}</div>
                    <div class="slot-role">${champ.role}</div>
                </div>
            </div>
        `;

        if (draftPhase === 'swap') {
            slot.addEventListener('click', () => handleSwapClick(slot, team, index));
        }
    } else {
        if (isActiveSlot) {
            slot.classList.add('active');
        }
        slot.innerHTML = `
            <div class="player-info">
                <span class="player-name">${player.name}</span>
                <span class="player-role">${player.role}</span>
            </div>
            <div class="slot-content">
                <div class="slot-avatar">${isActiveSlot ? '⚡' : '+'}</div>
                <div class="slot-info">
                    <div class="slot-name">Vacío</div>
                    <div class="slot-role">${isActiveSlot ? 'Tu turno' : 'Esperando selección'}</div>
                </div>
            </div>
        `;
    }

    return slot;
}

// --- MANEJAR CLICK EN CAMPEÓN ---
function handleChampionClick(champ) {
    if (draftPhase === 'draft') {
        const currentTurn = draftTurns[currentTurnIndex];

        if (currentTurn.type === 'ban' && !bannedChampions.has(champ.id)) {
            if (currentTurn.team === 'blue') {
                const banIndex = blueBans.findIndex(b => b === null);
                blueBans[banIndex] = champ.id;
            } else {
                const banIndex = redBans.findIndex(b => b === null);
                redBans[banIndex] = champ.id;
            }
            bannedChampions.add(champ.id);

            draftLog.push({
                turn: currentTurnIndex + 1,
                type: 'ban',
                team: currentTurn.team,
                champion: { ...champ }
            });

            nextTurn();
        } else if (currentTurn.type === 'pick' && !selectedChampions.has(champ.id) && !bannedChampions.has(champ.id)) {
            if (currentTurn.team === 'blue') {
                const pickIndex = blueTeam.findIndex(p => p === null);
                blueTeam[pickIndex] = champ;
            } else {
                const pickIndex = redTeam.findIndex(p => p === null);
                redTeam[pickIndex] = champ;
            }
            selectedChampions.add(champ.id);

            draftLog.push({
                turn: currentTurnIndex + 1,
                type: 'pick',
                team: currentTurn.team,
                champion: { ...champ }
            });

            nextTurn();
        }
    }
}

// --- SIGUIENTE TURNO ---
function nextTurn() {
    currentTurnIndex++;

    if (currentTurnIndex >= draftTurns.length) {
        draftPhase = 'swap';
        document.body.className = '';
        swapInstructions.classList.add('active');
        renderChampions();
        renderTeams();
        updateDraftStatus();
        return;
    }

    updateDraftStatus();
    renderChampions();
    renderBans();
    renderTeams();
}

// --- TIMER FUNCTIONS ---
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function startTimer(team) {
    stopTimer();

    currentActiveTeam = team;

    if (team === 'blue') {
        blueTimerDiv.classList.add('active');
        blueTimerDiv.classList.remove('paused');
        redTimerDiv.classList.remove('active');
        redTimerDiv.classList.add('paused');
    } else {
        redTimerDiv.classList.add('active');
        redTimerDiv.classList.remove('paused');
        blueTimerDiv.classList.remove('active');
        blueTimerDiv.classList.add('paused');
    }

    currentTimerInterval = setInterval(() => {
        if (team === 'blue') {
            blueTimerSeconds++;
            blueTimerDiv.textContent = formatTime(blueTimerSeconds);
        } else {
            redTimerSeconds++;
            redTimerDiv.textContent = formatTime(redTimerSeconds);
        }
    }, 1000);
}

function stopTimer() {
    if (currentTimerInterval) {
        clearInterval(currentTimerInterval);
        currentTimerInterval = null;
    }
    currentActiveTeam = null;

    blueTimerDiv.classList.remove('active');
    redTimerDiv.classList.remove('active');
    blueTimerDiv.classList.add('paused');
    redTimerDiv.classList.add('paused');
}

// --- ACTUALIZAR ESTADO (con sincronización de matiz del fondo) ---
function updateDraftStatus() {
    const currentTurn = draftTurns[currentTurnIndex];

    if (draftPhase === 'draft') {
        document.body.className = currentTurn.team + '-turn';

        // Cambiar el matiz del fondo según el equipo activo
        if (window.meshBackground) {
            window.meshBackground.setTeam(currentTurn.team);
        }

        if (currentActiveTeam !== currentTurn.team) {
            startTimer(currentTurn.team);
        }

        if (currentTurn.type === 'ban') {
            draftStatus.innerHTML = `<span class="status-ban">FASE DE BANS - Turno: <span class="status-${currentTurn.team}">${currentTurn.team.toUpperCase()}</span></span>`;
            turnIndicator.className = `turn-indicator turn-${currentTurn.team}`;
            turnIndicator.textContent = `BAN - ${currentTurn.team.toUpperCase()}`;
        } else {
            draftStatus.innerHTML = `<span class="status-${currentTurn.team}">FASE DE PICKS - Turno: <span class="status-${currentTurn.team}">${currentTurn.team.toUpperCase()}</span></span>`;
            turnIndicator.className = `turn-indicator turn-${currentTurn.team}`;
            turnIndicator.textContent = `PICK - ${currentTurn.team.toUpperCase()}`;
        }
    } else if (draftPhase === 'swap') {
        draftStatus.innerHTML = `<span class="status-blue">FASE DE INTERCAMBIO</span>`;
        turnIndicator.className = 'turn-indicator turn-blue';
        turnIndicator.textContent = 'SWAP MODE';
        if (window.meshBackground) {
            window.meshBackground.setTeam('neutral');
        }
        stopTimer();
    }
}

// --- MANEJAR SWAP ---
function handleSwapClick(slot, team, index) {
    if (!swapMode.isSwapping) {
        swapMode.isSwapping = true;
        swapMode.firstSlot = { team, index };
        swapMode.team = team;
        slot.classList.add('swap-hover');
    } else {
        if (swapMode.team === team) {
            const champ1 = team === 'blue' ? blueTeam[index] : redTeam[index];
            const champ2 = team === 'blue' ? blueTeam[swapMode.firstSlot.index] : redTeam[swapMode.firstSlot.index];

            if (team === 'blue') {
                blueTeam[index] = champ2;
                blueTeam[swapMode.firstSlot.index] = champ1;
            } else {
                redTeam[index] = champ2;
                redTeam[swapMode.firstSlot.index] = champ1;
            }

            resetSwapMode();
            renderTeams();
        }
    }
}

function resetSwapMode() {
    swapMode.isSwapping = false;
    swapMode.firstSlot = null;
    swapMode.team = null;

    document.querySelectorAll('.team-slot.swap-hover').forEach(slot => {
        slot.classList.remove('swap-hover');
    });
}

// --- FILTROS Y BÚSQUEDA ---
let currentFilter = 'all';
let searchTerm = '';

function getFilteredChampions() {
    return champions.filter(champ => {
        const matchesSearch = champ.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = currentFilter === 'all' || champ.role === currentFilter;
        return matchesSearch && matchesRole;
    });
}

roleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        roleButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.role;
        renderChampions();
    });
});

searchInput.addEventListener('input', (e) => {
    searchTerm = e.target.value;
    renderChampions();
});

// --- GET CURRENT TEAM ---
function currentTeam() {
    return draftTurns[currentTurnIndex]?.team || 'blue';
}
