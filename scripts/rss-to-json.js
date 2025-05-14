"use strict";
// C:\Users\kwsty\lonely-limit\scripts\rss-to-json.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var rss_parser_1 = __importDefault(require("rss-parser"));
var feeds = [
    { source: 'zenn', url: 'https://zenn.dev/mijucation/feed?all=1' },
    { source: 'note', url: 'https://note.com/ky1103/rss' },
];
/** クエリ・ハッシュを切り落とし origin+pathname で正規化 */
function linkKey(raw) {
    try {
        var clean = raw.split(/[?#]/)[0].trim();
        var u = new URL(clean);
        return u.origin + u.pathname.replace(/\/$/, '');
    }
    catch (_a) {
        return raw.trim();
    }
}
/** 新規 ID を作るときは source-linkKey */
function makeId(source, link) {
    return "".concat(source, "-").concat(linkKey(link));
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var parser, dataPath, oldStories, oldByKey, merged, _i, feeds_1, feedDef, feed, _a, _b, item, link, key, old, rssTags, unique;
        var _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    parser = new rss_parser_1.default();
                    dataPath = path_1.default.resolve(__dirname, '../src/data/stories.json');
                    oldStories = [];
                    if (fs_1.default.existsSync(dataPath)) {
                        oldStories = JSON.parse(fs_1.default.readFileSync(dataPath, 'utf-8'));
                    }
                    oldByKey = new Map(oldStories.map(function (s) { return [linkKey(s.url), s]; }));
                    merged = [];
                    _i = 0, feeds_1 = feeds;
                    _f.label = 1;
                case 1:
                    if (!(_i < feeds_1.length)) return [3 /*break*/, 4];
                    feedDef = feeds_1[_i];
                    return [4 /*yield*/, parser.parseURL(feedDef.url)];
                case 2:
                    feed = _f.sent();
                    for (_a = 0, _b = (_c = feed.items) !== null && _c !== void 0 ? _c : []; _a < _b.length; _a++) {
                        item = _b[_a];
                        if (!item.link || !item.pubDate)
                            continue;
                        link = item.link;
                        key = linkKey(link);
                        old = oldByKey.get(key);
                        if (!old) {
                            console.warn("[rss-to-json] no old data for key=".concat(key));
                        }
                        rssTags = (item.categories || []);
                        merged.push({
                            id: (_d = old === null || old === void 0 ? void 0 : old.id) !== null && _d !== void 0 ? _d : makeId(feedDef.source, link),
                            source: feedDef.source,
                            title: item.title || (old === null || old === void 0 ? void 0 : old.title) || '',
                            summary: (item.contentSnippet || '').slice(0, 140) || (old === null || old === void 0 ? void 0 : old.summary) || '',
                            url: link,
                            tags: (_e = old === null || old === void 0 ? void 0 : old.tags) !== null && _e !== void 0 ? _e : rssTags,
                            published: new Date(item.pubDate).toISOString().slice(0, 10),
                            hidden: (old === null || old === void 0 ? void 0 : old.hidden) === true,
                        });
                    }
                    _f.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    unique = Array.from(new Map(merged.map(function (s) { return [linkKey(s.url), s]; })).values()).sort(function (a, b) { return (a.published < b.published ? 1 : -1); });
                    // ④ JSON 出力
                    fs_1.default.writeFileSync(dataPath, JSON.stringify(unique, null, 2) + '\n');
                    console.log("\u2705 stories.json updated: ".concat(unique.length, " items"));
                    return [2 /*return*/];
            }
        });
    });
}
main().catch(function (err) {
    console.error(err);
    process.exit(1);
});
