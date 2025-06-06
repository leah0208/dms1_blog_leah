var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/riscript.js
import he from "/scripts/he.js";
import { Query } from "mingo";
import { Lexer } from "chevrotain";

// src/parser.js
import { CstParser } from "chevrotain";
var RiScriptParser = class extends CstParser {
  constructor(allTokens, textTypes) {
    super(allTokens, { nodeLocationTracking: "full" });
    this.atomTypes = ["silent", "assign", "symbol", "choice", "pgate", "text", "entity"];
    this.textTypes = textTypes;
    this.buildRules();
  }
  parse(opts) {
    this.input = opts.tokens;
    let cst = this.script();
    if (this.errors.length > 0)
      throw Error("[PARSING]\n" + this.errors[0].message);
    return cst;
  }
  /*
    Specification:
      script: expr+
      expr: atom+
      atom: (choice | symbol | text | silent | entity | pgate | assign)
      wexpr: (expr | Weight)*
      symbol: Symbol transform*
      choice: [ gate? orExpr elseExpr? ] transform*
      assign: Symbol EQ expr
      silent: { gate? (symbol | assign) }
      orExpr: wexpr (OR wexpr)*
      elseExpr: ELSE orExpr
      pgate: PGate
      entity: Entity
      gate: Mingo
      text: Raw | STAT | AMP 
  */
  buildRules() {
    const $ = this, Tokens = this.tokensMap;
    $.RULE("script", () => {
      $.MANY(() => $.SUBRULE($.expr));
    });
    $.RULE("expr", () => {
      $.AT_LEAST_ONE(() => $.SUBRULE($.atom));
    });
    $.RULE("atom", () => {
      $.OR(this.atomTypes.map((t) => ({ ALT: () => $.SUBRULE($[t]) })));
    });
    $.RULE("wexpr", () => {
      $.MANY(() => {
        $.OR([
          { ALT: () => $.SUBRULE($.expr) },
          { ALT: () => $.CONSUME(Tokens.Weight) }
        ]);
      });
    });
    $.RULE("symbol", () => {
      $.CONSUME(Tokens.Symbol);
      $.MANY(() => $.CONSUME(Tokens.Transform));
    });
    $.RULE("choice", () => {
      $.CONSUME(Tokens.OC);
      $.OPTION1(() => $.SUBRULE($.gate));
      $.SUBRULE($.orExpr);
      $.OPTION2(() => {
        $.SUBRULE2($.elseExpr);
      });
      $.CONSUME(Tokens.CC);
      $.MANY(() => $.CONSUME(Tokens.Transform));
    });
    $.RULE("assign", () => {
      $.CONSUME(Tokens.Symbol);
      $.CONSUME(Tokens.EQ);
      $.SUBRULE($.expr);
    });
    $.RULE("silent", () => {
      $.CONSUME(Tokens.OS);
      $.OPTION1(() => $.SUBRULE($.gate));
      $.CONSUME(Tokens.Symbol);
      $.OPTION2(() => {
        $.CONSUME(Tokens.EQ);
        $.SUBRULE($.expr);
      });
      $.CONSUME(Tokens.CS);
    });
    $.RULE("orExpr", () => {
      $.MANY_SEP({
        SEP: Tokens.OR,
        DEF: () => $.SUBRULE($.wexpr)
      });
    });
    $.RULE("elseExpr", () => {
      $.CONSUME(Tokens.ELSE);
      $.SUBRULE($.orExpr);
    });
    $.RULE("pgate", () => {
      $.CONSUME(Tokens.PendingGate);
    });
    $.RULE("entity", () => {
      $.CONSUME(Tokens.Entity);
    });
    $.RULE("gate", () => {
      $.MANY(() => $.CONSUME(Tokens.Gate));
    });
    $.RULE("text", () => {
      $.OR(this.textTypes.map((t) => ({ ALT: () => $.CONSUME(Tokens[t]) })));
    });
    this.performSelfAnalysis();
  }
};

// src/util.js
var _Util = class _Util {
  ///////////////////////// FUNCTIONS /////////////////////////
  static formatAny(o) {
    if (typeof o === "string")
      return `'${o}'`;
    else if (typeof o === "number")
      return o;
    if (typeof o === "function")
      throw Error("unexpected function");
    return JSON.stringify(o).replace(/"/g, "");
  }
  static transformNames(txs) {
    return txs && txs.length ? txs.map((tx) => tx.image.replace(/(^\.|\(\)$)/g, ""), []) : [];
  }
  static escapeText(s, quotify) {
    if (typeof s !== "string")
      return _Util.formatAny(s);
    let t = s.replace(/\r?\n/g, "\\n");
    return quotify || !t.length ? "'" + t + "'" : t;
  }
  static stringHash(s) {
    let chr, hash = 0;
    for (let i = 0; i < s.length; i++) {
      chr = s.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0;
    }
    let strHash = hash.toString().padStart(9, "0");
    return hash < 0 ? strHash.replace("-", "0") : strHash;
  }
  static escapeMarkdownLink(txt) {
    let result = txt;
    let lookups = { "[": "&lsqb;", "]": "&rsqb;", "(": "&lpar;", ")": "&rpar;", "/": "&sol;" };
    Object.entries(lookups).forEach(([k, v]) => result = result.replace(new RegExp(`\\${k}`, "g"), v));
    return result;
  }
  static slashEscToEntities(s) {
    s = _Util.replaceAll(s, "\\(", "&lpar;");
    s = _Util.replaceAll(s, "\\)", "&rpar;");
    s = _Util.replaceAll(s, "\\[", "&lsqb;");
    s = _Util.replaceAll(s, "\\]", "&rsqb;");
    s = _Util.replaceAll(s, "\\{", "&lcqb;");
    s = _Util.replaceAll(s, "\\}", "&rcqb;");
    s = _Util.replaceAll(s, "\\@", "&commat;");
    s = _Util.replaceAll(s, "\\#", "&num;");
    s = _Util.replaceAll(s, "\\|", " &vert");
    s = _Util.replaceAll(s, "\\=", " &equals");
    return s;
  }
  static escapeJSONRegex(text) {
    return text.replace(
      /\/([^/]+?)\/([igmsuy]*)/g,
      `"${_Util.RegexEscape}$1${_Util.RegexEscape}$2${_Util.RegexEscape}"`
    );
  }
  static escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  static replaceAll(str, match, replacement) {
    return str.replace(new RegExp(_Util.escapeRegExp(match), "g"), () => replacement);
  }
};
///////////////////////// CONSTANTS /////////////////////////
/**
 * @static
 * @memberof Util
 * @package
 */
__publicField(_Util, "RegexEscape", "_RE_");
var Util = _Util;

// src/visitor.js
var { escapeText, stringHash, formatAny, transformNames } = Util;
var BaseVisitor = class {
  constructor(riScript) {
    this.input = "";
    this.nowarn = false;
    this.tracePath = true;
    this.scripting = riScript;
    this.warnOnInvalidGates = false;
    this.maxRecursionDepth = 10;
  }
  textFromCstNode(node) {
    if (Array.isArray(node))
      node = node[0];
    return this.input.substring(
      node.location.startOffset,
      node.location.endOffset + 1
    );
  }
  isCstNode(o) {
    if (Array.isArray(o))
      o = o[0];
    return typeof o === "object" && ("accept" in o || "name" in o && "location" in o && "children" in o);
  }
  visit(cstNode, options) {
    if (Array.isArray(cstNode)) {
      cstNode = cstNode[0];
    }
    if (typeof cstNode === "undefined") {
      return void 0;
    }
    if (!this.isCstNode(cstNode)) {
      throw Error("Non-cstNode passed to visit: " + JSON.stringify(cstNode));
    }
    this.nodeText = this.textFromCstNode(cstNode);
    const name = cstNode.name;
    if (typeof this[name] !== "function") {
      throw Error(`BaseVisitor.visit: expecting function for this[${name}], found ${typeof this[name]}: ${JSON.stringify(this[name])}`);
    }
    return this[name](cstNode.children, options);
  }
  validateVisitor() {
  }
};
var RiScriptVisitor = class extends BaseVisitor {
  constructor(riScript, context = {}) {
    super(riScript);
    this.order = 0;
    this.trace = 0;
    this.indent = 0;
    this.choices = {};
    this.context = context;
    this.isNoRepeat = false;
    this.Symbols = this.scripting.Symbols;
    this.Escaped = this.scripting.Escaped;
    this.statics = {};
    this.dynamics = {};
    this.pendingGates = {};
    this.validateVisitor();
  }
  start(opts = {}) {
    this.input = opts.input;
    this.trace = opts.trace;
    this.nowarn = opts.silent;
    this.traceTx = opts.traceTx;
    if (!opts.cst)
      throw Error("no cst");
    return super.visit(opts.cst);
  }
  script(ctx) {
    this.order = this.indent = 0;
    if (Object.keys(ctx).length !== 1)
      throw Error("script: invalid expr");
    let count = ctx.expr[0].children.atom.length;
    this.print("script", `'${escapeText(this.input)}' :: ${count} atom(s)`);
    if (!count)
      return "";
    this.indent++;
    let value = this.visit(ctx.expr);
    this.indent--;
    this.print("/script");
    return value;
  }
  expr(ctx) {
    const types = Object.keys(ctx);
    if (types.length !== 1)
      throw Error("invalid expr: " + types.length);
    const exprs = ctx.atom.map((c) => this.visit(c));
    if (exprs.length === 1)
      return exprs[0];
    for (let i = 1; i < exprs.length - 1; i++) {
      if (exprs[i].length === 0 && exprs[i - 1].endsWith(" ") && exprs[i + 1].startsWith(" ")) {
        exprs[i + 1] = exprs[i + 1].substring(1);
      }
    }
    return exprs.join("");
  }
  atom(ctx) {
    let result;
    const types = Object.keys(ctx);
    if (types.length !== 1)
      throw Error("invalid atom: " + types);
    this.scripting.parser.atomTypes.forEach((type) => {
      if (ctx[type]) {
        if (ctx[type].length !== 1) {
          throw Error(type + ": bad length -> " + ctx[type].length);
        }
        result = this.visit(ctx[type][0]);
        if (typeof result === "function") {
          result = result.call();
        }
      }
    });
    return result;
  }
  silent(ctx) {
    this.print("silent", this.nodeText);
    this.indent++;
    if (ctx.EQ) {
      this.assign(ctx, { silent: true });
    } else {
      this.symbol(ctx, { silent: true });
    }
    this.indent--;
    this.print("/silent", "statics=" + formatAny(this.statics));
    return "";
  }
  assign(ctx, opts) {
    const sym = ctx.Symbol[0].image;
    const original = this.nodeText;
    const ident = sym.replace(this.scripting.regex.AnySymbol, "");
    const isStatic = sym.startsWith(this.Symbols.STATIC);
    const isSilent = opts?.silent;
    let info = `${original} ${isStatic && isSilent ? "{#static,silent}" : (isStatic ? "{#static}" : "") + (isSilent ? "{silent}" : "")}`;
    this.print("assign", info);
    let value;
    if (isStatic) {
      if (ident in this.statics && !this.scripting.isParseable(this.statics[ident])) {
        value = this.statics[ident];
        info = `${sym} = ${formatAny(value)} {#resolved}`;
      } else {
        this.indent++;
        value = this.visit(ctx.expr);
        this.indent--;
        this.statics[ident] = value;
        if (typeof value === "string" && this.scripting.isParseable(value)) {
          value = this.inlineStaticAssign(ident, ctx.Transform, value);
        }
        info = `${sym} = ${formatAny(value)}`;
      }
      this.print("/assign", info);
    } else {
      const $ = this;
      this.indent++;
      value = () => $.visit(ctx.expr);
      this.indent--;
      this.dynamics[ident] = value;
      this.print("/assign", `${sym} =  <f*:pending>`);
    }
    return value;
  }
  // end assign
  symbol(ctx, opts) {
    if (ctx.Symbol.length !== 1)
      throw Error("[1] invalid symbol");
    const isSilent = opts?.silent;
    const original = this.nodeText;
    const sym = ctx.Symbol[0].image.replace(/\(\)$/, "");
    const ident = sym.replace(this.scripting.regex.AnySymbol, "");
    this.isNoRepeat = this.hasNoRepeat(ctx.Transform);
    this.print("symbol", `${original} ${isSilent ? " {silent}" : ""}`);
    let { result, isStatic, isUser, resolved } = this.checkContext(ident);
    if (!isStatic && this.scripting.regex.StaticSymbol.test(sym)) {
      if (!this.scripting.regex.Entity.test(sym)) {
        throw Error(`Attempt to refer to dynamic symbol '${ident}' as ${this.Symbols.STATIC}${ident}, did you mean $${ident}?`);
      }
    }
    for (let i = 0; typeof result === "function"; i++) {
      result = result.call();
      resolved = !this.scripting.isParseable(result);
      if (i === this.maxRecursionDepth)
        throw Error("Max recursion depth reached");
    }
    if (this.isNoRepeat && (isStatic || isUser)) {
      this.isNoRepeat = false;
      const msg = "Attempt to call norepeat() on " + (isStatic ? "static symbol '" + sym + "'. Did you mean to use '" + this.Symbols.DYNAMIC + ident + "' ?" : "non-dynamic symbol '" + ident + "'. Did you mean to define '" + this.Symbols.DYNAMIC + ident + "' in riscript?");
      throw Error(msg);
    }
    if (typeof result === "undefined") {
      this.print("/symbol", sym + " -> '" + original + "' ctx=" + this.lookupsToString(), "[deferred]", opts?.silent ? "{silent}" : "");
      return original;
    }
    let info = opts?.trace ? `${original.replace(/\(\)$/, "")} -> ${formatAny(result)}` + (opts?.silent ? " {silent}" : "") : null;
    if (typeof result === "string" && !resolved) {
      if (isStatic) {
        result = this.inlineStaticAssign(ident, ctx.Transform, result);
        this.print("/symbol", `${original} -> ${result}`);
      } else {
        if (ctx.Transform)
          result = this.restoreTransforms(result, ctx.Transform);
        this.print("/symbol", info);
      }
      return result;
    }
    if (isStatic)
      this.statics[ident] = result;
    if (ctx.Transform) {
      result = this.applyTransforms(result, ctx.Transform);
      info += "-> '" + result + "'";
      if (this.isNoRepeat)
        info += " (norepeat)";
    } else if (result.length === 0 && sym.length === 1) {
      result = sym;
      info = "** $ **";
    }
    this.print("/symbol", info);
    this.isNoRepeat = false;
    return result;
  }
  // end symbol
  choice(ctx, opts) {
    const $ = this.Symbols;
    const original = this.nodeText;
    const choiceKey = stringHash(original + " #" + this.choiceId(ctx));
    let gateText, gateResult, hasTransforms = ctx.Transform;
    if (!this.isNoRepeat && this.hasNoRepeat(ctx.Transform)) {
      throw Error("noRepeat() not allowed on choice (use a $variable instead): " + original);
    }
    this.print("choice", original);
    let decision = "accept";
    if (opts?.forceReject) {
      decision = "reject";
    } else {
      let gateCtx = ctx?.gate?.[0]?.children?.Gate;
      if (gateCtx) {
        gateText = gateCtx[0].image;
        this.indent++;
        gateResult = this.visit(ctx.gate);
        this.indent--;
        decision = gateResult.decision;
        let ginfo = `${gateText} -> ${decision !== "defer" ? decision.toUpperCase() : `DEFER ${$.PENDING_GATE}${choiceKey}`}  ${this.lookupsToString()}`;
        this.print("gate", ginfo);
      }
      if (gateResult && gateResult.decision === "defer") {
        this.pendingGates[choiceKey] = {
          gateText,
          deferredContext: ctx,
          operands: gateResult.operands
        };
        return `${$.PENDING_GATE}${choiceKey}`;
      }
    }
    let orExpr = ctx?.orExpr[0];
    if (decision === "reject") {
      if (!("elseExpr" in ctx))
        return "";
      orExpr = ctx.elseExpr[0].children.orExpr[0];
    }
    const options = this.parseOptions(orExpr);
    if (!options)
      throw Error("No options in choice: " + original);
    let value = null;
    const excluded = [];
    let restored = false;
    while (value === null) {
      value = this.choose(options, excluded);
      for (let i = 0; this.isCstNode(value); i++) {
        this.indent++;
        value = this.visit(value);
        this.indent--;
        if (i === this.maxRecursionDepth)
          throw Error("Max recursion depth reached");
      }
      if (typeof value === "string") {
        value = value.trim();
      } else if (typeof value !== "number") {
        if (ctx.Transform)
          value = this.applyTransforms(value, ctx.Transform);
        hasTransforms = false;
      }
      if (this.scripting.isParseable(value)) {
        if (ctx.Transform)
          value = this.restoreTransforms(value, ctx.Transform);
        restored = true;
        break;
      }
      if (hasTransforms)
        value = this.applyTransforms(value, ctx.Transform);
      if (this.isNoRepeat && value === this.choices[choiceKey]) {
        this.print("choice-reject", value + " [norepeat]");
        excluded.push(value);
        value = null;
        continue;
      }
    }
    if (!restored)
      this.choices[choiceKey] = value;
    this.print("choice/", original + " -> '" + value + "'");
    return value;
  }
  // end choice
  choose(options, excludes = []) {
    if (!options || !options.length) {
      throw Error("Invalid choice: no options");
    }
    const valid = options.filter((x) => !excludes.includes(x));
    if (!valid.length) {
      throw Error("Invalid choice: no valid options");
    }
    const index = this.scripting.RiTa.randi(valid.length);
    let value = valid[index];
    return value;
  }
  text(ctx) {
    if (Object.keys(ctx).length !== 1)
      throw Error("[2] invalid text");
    const type = this.scripting.textTypes.filter((t) => ctx[t]);
    const image = ctx[type][0].image;
    this.print("text/", escapeText("'" + image + "'"));
    return image;
  }
  entity(ctx) {
    return this.nodeText;
  }
  gate(ctx) {
    if (ctx.Gate.length !== 1)
      throw Error("Invalid gate: " + ctx.Gate);
    let raw = ctx.Gate[0].image, mingoQuery;
    if (raw.startsWith(this.Symbols.OPEN_GATE)) {
      raw = raw.substring(1);
    }
    try {
      mingoQuery = this.scripting.createQuery(raw);
    } catch (e) {
      if (!this.warnOnInvalidGates) {
        throw Error(`Invalid gate[2]: "@${raw}"

RootCause -> ${e}`);
      }
      if (!this.scripting.RiTa.SILENT && !this.nowarn) {
        console.warn(`[WARN] Ignoring invalid gate: @${raw}@
`, e);
      }
      return { decision: "accept" };
    }
    const resolvedOps = {};
    const unresolvedOps = [];
    const operands = mingoQuery.operands();
    operands.forEach((sym) => {
      let { result: result2, resolved, isStatic, isUser } = this.checkContext(sym);
      for (let i = 0; typeof result2 === "function"; i++) {
        result2 = result2.call();
        resolved = !this.scripting.isParseable(result2);
        if (i === this.maxRecursionDepth)
          throw Error("Max recursion depth reached");
      }
      if (typeof result2 === "undefined" || !resolved) {
        unresolvedOps.push(sym);
      } else {
        if (isStatic) {
          this.statics[sym] = result2;
        } else if (isUser) {
          this.context[sym] = result2;
        } else {
          this.dynamics[sym] = result2;
        }
        resolvedOps[sym] = result2;
      }
    });
    if (Object.keys(resolvedOps).length + unresolvedOps.length !== operands.length) {
      throw Error("invalid operands");
    }
    if (unresolvedOps.length) {
      return { decision: "defer", operands: unresolvedOps };
    }
    let result = mingoQuery.test(resolvedOps);
    if (!result && this.castValues(resolvedOps)) {
      result = mingoQuery.test(resolvedOps);
    }
    return { decision: result ? "accept" : "reject" };
  }
  pgate(ctx) {
    this.print("pgate", this.nodeText);
    const original = this.nodeText;
    const ident = original.replace(this.Symbols.PENDING_GATE, "");
    const lookup = this.pendingGates[ident];
    if (!lookup) {
      throw Error('no pending gate="' + original + '" pgates=' + JSON.stringify(Object.keys(this.pendingGates)));
    }
    const stillUnresolved = lookup.operands.some((o) => {
      let { result, resolved } = this.checkContext(o);
      if (typeof result === "function") {
        result = result.call();
        resolved = !this.scripting.isParseable(result);
      }
      return typeof result === "undefined" || !resolved;
    });
    if (stillUnresolved)
      return original;
    return this.choice(lookup.deferredContext);
  }
  else(ctx) {
    return this.visit(ctx.expr).trim();
  }
  // Helpers ================================================
  hasNoRepeat(tfs) {
    const transforms = transformNames(tfs);
    if (transforms.length) {
      return transforms.includes("nr") || transforms.includes("norepeat");
    }
    return false;
  }
  checkContext(ident, opts = {}) {
    let isStatic = false;
    let isUser = false;
    let result;
    if (ident.length === 0) {
      return { result: "", resolved: true, isStatic, isUser };
    }
    result = this.dynamics[ident];
    if (typeof result === "undefined") {
      result = this.statics[ident];
      if (typeof result !== "undefined") {
        isStatic = true;
      }
    }
    if (typeof result === "undefined") {
      result = this.context[ident];
      if (typeof result !== "undefined") {
        isUser = true;
      }
    }
    if (typeof result === "undefined") {
      result = this.scripting.transforms[ident];
    }
    const resolved = !this.scripting.isParseable(result);
    return { result, isStatic, isUser, resolved };
  }
  inlineStaticAssign(ident, tfs, result) {
    const $ = this.Symbols;
    const lhs = $.STATIC + ident;
    const rhs = result;
    let stmt = $.OPEN_CHOICE + (lhs + "=" + rhs) + $.CLOSE_CHOICE;
    result = this.restoreTransforms(stmt, tfs);
    return result;
  }
  choiceId(ctx) {
    if (!ctx.OC || !ctx.OC.length)
      throw Error("invalid choice");
    return ctx.OC[0].startOffset + "." + ctx.OC[0].endOffset;
  }
  parseOptions(ctx) {
    const options = [];
    if (ctx && ctx?.children?.wexpr) {
      const wexprs = ctx.children.wexpr;
      for (let i = 0; i < wexprs.length; i++) {
        const wexpr = wexprs[i];
        const expr = wexpr.children.expr;
        if (expr && expr.length != 1) {
          throw Error("invalid choice-expr: " + expr.length);
        }
        const weight = wexpr.children.Weight;
        if (weight) {
          if (weight.length != 1) {
            throw Error("invalid weight: " + weight.length);
          }
          let mult = 1;
          try {
            mult = parseInt(
              this.Symbols.CLOSE_WEIGHT.length ? weight[0].image.trim().slice(1, -1) : weight[0].image.trim().slice(1)
            );
          } catch (e) {
            console.log("EX: " + mult);
          }
          Array.from({ length: mult }, () => options.push(expr));
        } else {
          options.push(expr || "");
        }
      }
    }
    return options;
  }
  applyTransforms(value, txs) {
    this.indent++;
    if (this.traceTx) {
      console.log("applyTransforms", this.formatTxs(...arguments));
    }
    for (let i = 0; i < txs.length; i++) {
      value = this.applyTransform(value, txs[i]);
    }
    this.indent--;
    return value;
  }
  applyTransform(target, transform) {
    const image = transform.image;
    const raw = target + image;
    const original = formatAny(target) + image;
    const tx = image.substring(1).replace(/\(\)$/, "");
    const RiTa = this.scripting.RiTa;
    let result;
    if (typeof this.dynamics[tx] === "function") {
      result = this.dynamics[tx].bind(this.context)(target);
    } else if (typeof this.statics[tx] === "function") {
      result = this.statics[tx].call(this.context, target);
    } else if (typeof this.context[tx] === "function") {
      result = this.context[tx].call(this.context, target);
    } else if (typeof this.scripting.transforms[tx] === "function") {
      result = this.scripting.transforms[tx].call(this.context, target);
    } else if (typeof target[tx] === "function") {
      result = target[tx]();
    } else {
      if (target.hasOwnProperty(tx)) {
        result = target[tx];
      } else {
        if (!RiTa.SILENT && !this.silent) {
          console.warn("[WARN] Unresolved transform: " + raw);
        }
        result = raw.replace(/\(\)$/, "&lpar;&rpar;");
      }
    }
    this.print("transform/", `${original} -> '${result}'`);
    return result;
  }
  // value is not yet resolved, so store with transform for later
  restoreTransforms(value, txs) {
    if (typeof value === "string") {
      const choiceRE = new RegExp("^" + this.Escaped.OPEN_CHOICE + ".*" + this.Escaped.CLOSE_CHOICE + "$");
      const symbolRE = new RegExp(`(${this.Escaped.DYNAMIC}|${this.Escaped.STATIC}[A-Za-z_0-9])[A-Za-z_0-9]*`);
      if (!choiceRE.test(value) && !symbolRE.test(value)) {
        value = this.Symbols.OPEN_CHOICE + value + this.Symbols.CLOSE_CHOICE;
      }
      if (txs) {
        txs.forEach((tx) => value += tx.image);
      }
      if (this.traceTx)
        console.log("restoreTransforms:", value);
    }
    return value;
  }
  castValues(obj) {
    let madeCast = false;
    Object.entries(obj).forEach(([k, v]) => {
      const num = parseFloat(v);
      if (!isNaN(num)) {
        madeCast = true;
        obj[k] = num;
      }
    });
    return madeCast;
  }
  contextIsResolved(table) {
    let allResolved = true;
    Object.entries(table).forEach(([key, val]) => {
      if (!this.scripting.isParseable(val)) {
        allResolved = false;
      }
    });
    return allResolved;
  }
  lookupsToString() {
    const dyns = {}, stats = {};
    Object.entries(this.dynamics || {}).forEach(([k, v]) => dyns[`$${k}`] = v);
    Object.entries(this.statics || {}).forEach(([k, v]) => stats[`#${k}`] = v);
    return JSON.stringify({ ...this.context, ...stats, ...dyns }, (k, v) => typeof v === "function" ? "<f*:pending>" : v).replace(/"/g, "");
  }
  formatTxs(value, txs) {
    return value + txs.map((tx) => tx.image.replace(/()/, "") + "()").join("");
  }
  print(s, ...args) {
    if (this.trace) {
      let indentStr = "  ".repeat(this.indent);
      let msg = `${indentStr}<${s}>${s.startsWith("/") ? "" : " "}`;
      if (++this.order < 10)
        msg = " " + msg;
      console.log(this.order, msg, ...args);
    }
  }
};

// src/tokens.js
import { createToken } from "chevrotain";
function getTokens(v2Compatible) {
  let Symbols = {
    OR: "|",
    ELSE: "||",
    DYNAMIC: "$",
    STATIC: "#",
    ENTITY: "&",
    OPEN_GATE: "@",
    PENDING_GATE: "@@",
    OPEN_SILENT: "{",
    CLOSE_SILENT: "}"
  };
  let v2Symbols = {
    OPEN_CHOICE: "(",
    CLOSE_CHOICE: ")",
    OPEN_WEIGHT: "[",
    CLOSE_WEIGHT: "]",
    CONTINUATION: "\\"
  };
  let v3Symbols = {
    OPEN_CHOICE: "[",
    CLOSE_CHOICE: "]",
    OPEN_WEIGHT: "^",
    // also allows (int), eg. (3)
    CLOSE_WEIGHT: "^",
    CONTINUATION: "~"
  };
  Object.assign(Symbols, v2Compatible ? v2Symbols : v3Symbols);
  const Escaped = {};
  Object.entries(Symbols).forEach(([k, v]) => {
    Escaped[k] = escapeRegex(v);
  });
  const ENTITY_PATTERN = /&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/i;
  const PENDING_GATE_PATTERN = new RegExp(`${Escaped.PENDING_GATE}([0-9]{9,11})`);
  Escaped.SPECIAL = Object.values(Escaped).join("").replace(/[<>@]/g, "");
  const DYN = createToken({ name: "DYN", pattern: new RegExp(Escaped.DYNAMIC) });
  const STAT = createToken({ name: "STAT", pattern: new RegExp(Escaped.STATIC) });
  const OC = createToken({ name: "OC", pattern: new RegExp(Escaped.OPEN_CHOICE + "\\s*") });
  const CC = createToken({ name: "CC", pattern: new RegExp(`\\s*${Escaped.CLOSE_CHOICE}`) });
  const OS = createToken({ name: "OS", pattern: new RegExp(`${Escaped.OPEN_SILENT}\\s*`) });
  const CS = createToken({ name: "CS", pattern: new RegExp(`\\s*${Escaped.CLOSE_SILENT}`) });
  const ELSE = createToken({ name: "ELSE", pattern: /\s*\|\|\s*/ });
  const OR = createToken({ name: "OR", pattern: /\s*\|\s*/ });
  const EQ = createToken({ name: "EQ", pattern: /\s*=\s*/ });
  const AMP = createToken({ name: "AMP", pattern: /&/ });
  const Symbol2 = createToken({ name: "Symbol", pattern: new RegExp(`(${Escaped.DYNAMIC}|${Escaped.STATIC}[A-Za-z_0-9])[A-Za-z_0-9]*(\\(\\))?`) });
  const Transform = createToken({ name: "Transform", pattern: /\.[A-Za-z_0-9][A-Za-z_0-9]*(\(\))?/ });
  const Entity = createToken({ name: "Entity", pattern: ENTITY_PATTERN });
  const Weight = createToken({ name: "Weight", pattern: new RegExp(`\\s*${Escaped.OPEN_WEIGHT}\\d+${Escaped.CLOSE_WEIGHT}\\s*`) });
  const PendingGate = createToken({ name: "PendingGate", pattern: PENDING_GATE_PATTERN });
  const Raw = createToken({ name: "Raw", pattern: new RegExp(`[^${Escaped.SPECIAL}]+`) });
  const Gate = createToken({ name: "Gate", line_breaks: true, pattern: bracketMatch });
  const tokens = [Gate, Entity, Weight, ELSE, OC, CC, OR, EQ, Symbol2, DYN, STAT, AMP, Transform, OS, CS, PendingGate, Raw];
  return { tokens, Constants: { Symbols, Escaped } };
}
function bracketMatch(text, startOffset) {
  if (!/^@/.test(text.substring(startOffset)))
    return null;
  let endOffset = startOffset + 1;
  let dbug = 0;
  if (dbug)
    console.log("bracketMatch", text);
  let charCode = text.charCodeAt(endOffset);
  while (charCode === 32) {
    endOffset++;
    charCode = text.charCodeAt(endOffset);
  }
  if (charCode !== 123) {
    if (dbug)
      console.log(`  "${text.substring(startOffset, endOffset)}" -> null1`);
    return null;
  }
  endOffset++;
  charCode = text.charCodeAt(endOffset);
  let depth = 1;
  while (depth > 0) {
    if (charCode === 123)
      depth++;
    else if (charCode === 125)
      depth--;
    if (dbug)
      console.log("  depth", depth, text.substring(startOffset, endOffset));
    endOffset++;
    charCode = text.charCodeAt(endOffset);
  }
  if (endOffset === startOffset) {
    if (dbug)
      console.log(`"${text.substring(startOffset, endOffset)}" -> null3`);
    return null;
  } else {
    let matchedString = text.substring(startOffset, endOffset);
    if (dbug)
      console.log("  returned -> ", [matchedString]);
    return [matchedString];
  }
}
function escapeRegex(s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
var TextTypes = ["Raw", "STAT", "AMP"];

// src/grammar.js
var _RiGrammar = class _RiGrammar {
  // assigned in riscript.js
  /**
   * Creates an instance of RiGrammar.
   * @param {Object<string, string>|string} [rules] - an object (or JSON string) containing the rules
   * @param {Object<string, any>} [context] - the context (or world-state)
   * @param {Object<string, any>} [options] - options for the grammar
   */
  constructor(rules = {}, context = {}, options = {}) {
    this.rules = {};
    this.context = context;
    this.scripting = options.RiTa?.riscript ?? new RiScript(options);
    if (typeof rules === "string") {
      rules = parseJSON(rules);
    }
    if (typeof rules !== "object") {
      throw Error("RiGrammar: expecting object, found " + typeof rules);
    }
    this.setRules(rules);
  }
  /**
   * Creates a new RiGrammar from the `rules`, `context` and `options`, then calls `expand()` on it.
   * @param {string} rules - an object containing the rules
   * @param {object} [context] - the context (or world-state) for the expansion
   * @param {object} [options] - options for the expansion
   * @param {string} [options.start='$start'] - the rule to start from
   * @param {boolean} [options.trace=false] - whether to trace the evaluation to the console
   * @param {boolean} [options.onepass=false] - whether to only do one evaluation pass 
   * @param {boolean} [options.silent=false] - whether to suppress console warnings
   * @returns {string} - the expanded text
   */
  static expand(rules, context, options) {
    return new _RiGrammar(rules, context).expand(options);
  }
  /**
   * Adds a transform to the Grammar instance
   * @param {string} name - the name of the transform
   * @param {Function} def - a function that takes a string and returns a string
   * @returns {RiGrammar} - the RiGrammar instance
   */
  addTransform(name, def) {
    this.scripting.addTransform(name, def);
    return this;
  }
  /**
   * Removes a transform from the Grammar instance
   * @param {string} name 
   * @returns {RiGrammar} - the RiGrammar instance
   */
  removeTransform(name) {
    this.scripting.removeTransform(name);
    return this;
  }
  /**
   * Returns the names of all current transforms
   * @returns {string[]} the names of the transforms
   */
  getTransforms() {
    return this.scripting.getTransforms();
  }
  /**
   * Tests whether two grammars are equal and returns a boolean
   * @param {RiGrammar} rg - the grammar to compare to 
   * @returns {boolean} - whether the grammars are equal
   */
  equals(rg) {
    return rg.toJSON() === this.toJSON();
  }
  /**
   * Expands a grammar from the supplied rule. If no rule is provided the `$start` and `<start>`
   *  symbols will be checked respectively. If a context is needed, it should be passed when the
   *  grammar is created.
   * @param {object} [options] - options for the expansion
   * @param {string} [options.start='$start'] - the rule to start from
   * @param {boolean} [options.trace=false] - whether to trace the evaluation to the console
   * @param {boolean} [options.onepass=false] - whether to only do one evaluation pass 
   * @param {boolean} [options.silent=false] - whether to suppress console warnings
   * @returns {string} - the expanded text
   */
  expand(options = {}) {
    if ("context" in options) {
      throw Error("pass context to RiScript.grammar() or new RiGrammar() instead");
    }
    let visitor = new RiScriptVisitor(this.scripting);
    visitor.context = this.context || {};
    let clonedOpts = { ...options, visitor, input: this._toScript(options) };
    return this.scripting._evaluate(clonedOpts);
  }
  /**
   * Validates a rule and adds a new rule to the grammar
   * @param {string} name - the name of the rule
   * @param {string} def - the definition of the rule
   * @returns {RiGrammar} - the RiGrammar instance
   */
  addRule(name, def) {
    this._validateRule(name, def);
    this.rules[name] = def;
    return this;
  }
  /**
   * Sets the rules for the grammar, removing any previous rules
   * @param {object|string} rules - an object or JSON string holding the rules for the grammar 
   * @returns {RiGrammar} - the RiGrammar instance
   */
  setRules(rules) {
    if (typeof rules === "undefined")
      throw Error("undefined rules");
    this.rules = {};
    let incoming = typeof rules === "string" ? parseJSON(rules) : rules;
    Object.entries(incoming).forEach((e) => this.addRule(...e));
    return this;
  }
  /**
   * Removes a rule from the grammar
   * @param {string} name - the name of the rule to remove
   * @returns {RiGrammar} - the RiGrammar instance
   */
  removeRule(name) {
    if (name in this.rules) {
      delete this.rules[name];
    }
    return this;
  }
  /**
   * Returns a JSON representation of the grammar rules, accepting options from `JSON.stringify()`
   * @param {any} [replacer] - a replacer function or array
   * @param {string | number} [space] - the number of spaces to indent
   * @returns {string} - the JSON representation of the grammar
   */
  toJSON(replacer, space) {
    return JSON.stringify(this.rules, replacer, space);
  }
  /** 
   * Returns a string representation of the grammar, accecpting the same options as `JSON.stringify()`
   * @param {object} [options] - options for the string representation
   * @param {any} [options.replacer] - a replacer function or array
   * @param {string | number} [options.space] - the number of spaces to indent
   * @param {string} [options.linebreak] - the linebreak character to use
   */
  toString(options = {}) {
    let replacer = options.replacer || 0;
    let space = options.space || 2;
    let lb = options?.linebreak;
    let res = this.toJSON(replacer, space);
    if (lb)
      res = res.replace(/\n/g, lb);
    return res;
  }
  /**
   * Creates a new RiGrammar from the supplied JSON string
   * @param {string} json - a JSON string representing the grammar
   * @param {object} [context] - optional context for the grammar
   * @returns {RiGrammar} - the RiGrammar instance
   */
  static fromJSON(json, context) {
    return new _RiGrammar(JSON.parse(json), context);
  }
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Converts grammar to inline rules; rules are dynamic, unless otherwise specified with leading #
   * @private
   */
  _toScript(opts) {
    let script = "", start = opts.start || "start";
    let { Symbols } = this.scripting;
    if (start.startsWith(Symbols.DYNAMIC)) {
      start = start.substring(Symbols.DYNAMIC.length);
    }
    if (start.startsWith(Symbols.STATIC)) {
      start = start.substring(Symbols.STATIC.length);
    }
    if (!(start in this.rules || Symbols.STATIC + start in this.rules)) {
      throw Error('Rule: "' + start + '" not found in grammar');
    }
    Object.entries(this.rules).forEach(([name, rule], i) => {
      while (name.startsWith(Symbols.DYNAMIC)) {
        name = name.substring(1);
      }
      if (!name.startsWith(Symbols.STATIC)) {
        name = Symbols.DYNAMIC + name;
      }
      if (!this.scripting.regex.ChoiceWrap.test(rule)) {
        rule = Symbols.OPEN_CHOICE + rule + Symbols.CLOSE_CHOICE;
      }
      script += `${name}=${rule}
`;
    });
    if (opts.trace)
      console.log("Grammar:\n" + script.replace(/^\$/gm, "  $"));
    script += `${Symbols.DYNAMIC}${start}`;
    return script;
  }
  /**
   * Validates a grammar rule
   * @private
   */
  _validateRule(name, def) {
    if (typeof name !== "string" || name.length === 0) {
      throw Error("expected [string] name");
    }
    if (typeof def === "undefined") {
      throw Error("undefined rule def: " + name);
    }
    let { Symbols } = this.scripting;
    if (name.startsWith(Symbols.DYNAMIC)) {
      name = name.substring(Symbols.DYNAMIC.length);
      throw Error("Grammar rules are dynamic by default; if you need a static rule, use '" + Symbols.STATIC + name + "', otherwise just use '" + name + "'.");
    }
  }
};
__publicField(_RiGrammar, "RiScript", null);
var RiGrammar = _RiGrammar;
function parseJSON(json) {
  if (typeof json === "string") {
    try {
      return JSON.parse(json);
    } catch (e) {
      throw Error("RiGrammar appears to be invalid JSON, please check it at http://jsonlint.com/\n" + json);
    }
  }
}

// src/riscript.js
var { decode } = he;
var Vowels = /[aeiou]/;
var HtmlEntities = /&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi;
var { escapeText: escapeText2, slashEscToEntities, escapeMarkdownLink, escapeJSONRegex } = Util;
var RiQuery = class extends Query {
  constructor(scripting, condition, options) {
    if (typeof condition !== "string") {
      try {
        condition = JSON.stringify(condition);
      } catch (e) {
        throw Error(condition.toString().includes("@") ? "Replace @ with $ when passing an object to RiQuery\nRoot: " + e : e);
      }
    }
    if (!condition.includes("$"))
      throw Error("Invalid Gate: '" + condition + "' -> operand must include $symbol or $function()");
    condition = condition.replace(/(\$|\(\))/g, "").replace(/@/g, "$");
    condition = scripting.parseJSOL(condition);
    super(condition, options);
  }
  test(obj) {
    let compiled = this.compiled;
    for (let i = 0, len = compiled.length; i < len; i++) {
      if (!compiled[i](obj))
        return false;
    }
    return true;
  }
  operands() {
    const stack = [this.condition];
    const keys = /* @__PURE__ */ new Set();
    while (stack?.length > 0) {
      const currentObj = stack.pop();
      Object.keys(currentObj).forEach((key) => {
        const value = currentObj[key];
        if (!key.startsWith("$"))
          keys.add(key);
        if (typeof value === "object" && value !== null) {
          const eles = Array.isArray(value) ? value : [value];
          eles.forEach((ele) => stack.push(ele));
        }
      });
    }
    return Array.from(keys);
  }
};
var _RiScript = class _RiScript {
  /**
   * Create a RiTa grammar instance
   * @param {object} [rules] - the rules of the grammar
   * @param {object} [context] - the context of the grammar
   * @param {object} [options] - options for the evaluation
   * @returns {RiGrammar} - a new RiGrammar instance
   */
  static grammar(rules, context, options) {
    return new RiGrammar(rules, context, options);
  }
  /**
   * Evaluates the input script via the RiScript parser
   * @param {string} script - the script to evaluate
   * @param {object} [context] - the context (or world-state) to evaluate in
   * @param {object} [options] - options for the evaluation
   * @param {object} [options.RiTa] - optionals RiTa object to use in transforms
   * @param {number} [options.compatibility] - the RiTa compatibility level (pass 2 for v2)
   * @param {boolean} [options.trace=false] - whether to trace the evaluation
   * @returns {string} - the evaluated script
   */
  static evaluate(script, context, options = {}) {
    return new _RiScript(options).evaluate(script, context, options);
  }
  /**
   * Creates a new RiScript instance
   * @param {object} [options] - options for the object
   * @param {object} [options.RiTa] - optionals RiTa object to use in transforms
   * @param {number} [options.compatibility] - the RiTa compatibility level
   */
  constructor(options = {}) {
    this.Escaped = void 0;
    this.Symbols = void 0;
    this.visitor = void 0;
    this.v2Compatible = options.compatibility === 2;
    const { Constants, tokens } = getTokens(this.v2Compatible);
    ({ Escaped: this.Escaped, Symbols: this.Symbols } = Constants);
    this.pendingGateRe = new RegExp(`${this.Escaped.PENDING_GATE}([0-9]{9,11})`, "g");
    this.textTypes = TextTypes;
    this.RiTa = options.RiTa || {
      VERSION: 0,
      randi: (k) => Math.floor(Math.random() * k)
    };
    this.transforms = this._createTransforms();
    this.regex = this._createRegexes(tokens);
    this.lexer = new Lexer(tokens);
    this.parser = new RiScriptParser(tokens, TextTypes);
  }
  /** @private */
  lex(opts) {
    if (!opts.input)
      throw Error("no input");
    const lexResult = this.lexer.tokenize(opts.input);
    if (lexResult.errors.length) {
      console.error("Input: " + opts.input + "\n", lexResult.errors[0].message);
      throw Error("[LEXING] " + lexResult.errors[0].message);
    }
    if (opts.traceLex)
      this._printTokens(lexResult.tokens);
    opts.tokens = lexResult.tokens;
  }
  /** @private */
  parse(opts) {
    opts.cst = this.parser.parse(opts);
  }
  /** @private */
  visit(opts) {
    return this.visitor.start(opts);
  }
  /**
   * Evaluates the input script via the RiScript parser
   * @param {string} script - the script to evaluate
   * @param {object} [context] - the context (or world-state) to evaluate in
   * @param {object} [options] - options for the evaluation
   * @returns {string}
   */
  evaluate(script, context, options) {
    if (typeof script !== "string") {
      throw Error("evaluate() expects a string, got " + typeof script);
    }
    if (typeof options !== "object") {
      options = {};
    }
    options.input = script;
    options.visitor = new RiScriptVisitor(this, context);
    return this._evaluate(options);
  }
  /** @private */
  lexParseVisit(opts = {}) {
    this.lex(opts);
    this.parse(opts);
    return this.visit(opts);
  }
  /**
   * Add a transform function to this instance
   * @param {string} name - the name of the transform
   * @param {function} def - the transform function
   * @returns {RiScript} this instance
   */
  addTransform(name, def) {
    this.transforms[name] = def;
    return this;
  }
  /**
   * Returns the names of all current transforms
   * @returns {string[]} the names of the transforms
   */
  getTransforms() {
    return Object.keys(this.transforms);
  }
  /**
   * Removes a transform function from this instance
   * @param {string} name of transform to remove
   * @returns {RiScript} this instance
   */
  removeTransform(name) {
    delete this.transforms[name];
    return this;
  }
  ///////////////////////////////////// End API //////////////////////////////////////
  /**
   * Private version of evaluate taking all arguments in the options object
   * @param {object} options - options for the evaluation
   * @param {string} options.input - the script to evaluate
   * @param {object} options.visitor - the visitor to use for the evaluation
   * @param {boolean} [options.trace] - whether to trace the evaluation
   * @param {boolean} [options.onepass] - whether to only do one pass
   * @param {boolean} [options.silent] - whether to suppress warnings
   * @returns {string} - the evaluated script's output text
   * @package
   */
  _evaluate(options) {
    const { input, visitor, trace, onepass, silent } = options;
    if (!input)
      throw Error("no input");
    if (!visitor)
      throw Error("no visitor");
    let last, endingBreak = this.regex.EndingBreak.test(input);
    let expr = this._preParse(input, options);
    if (!expr)
      return "";
    if (!options.visitor)
      throw Error("no visitor");
    this.visitor = options.visitor;
    delete options.visitor;
    if (trace) {
      console.log(`
Input:  '${escapeText2(input)}' ctx=${visitor.lookupsToString()}`);
      if (input !== expr) {
        console.log(`Parsed: '${escapeText2(expr)}'`);
      }
    }
    for (let i = 1; expr !== last && i <= 10; i++) {
      last = expr;
      if (trace)
        console.log("-".repeat(20) + " Pass#" + i + " " + "-".repeat(20));
      options.input = expr;
      expr = this.lexParseVisit(options) ?? "";
      if (trace) {
        console.log(`Result(${i}) -> "${escapeText2(expr || "")}" ctx=${this.visitor.lookupsToString()}`);
      }
      if (onepass || !this.isParseable(expr))
        break;
    }
    if (!silent && !this.RiTa.SILENT) {
      if (this.regex.ValidSymbol.test(expr.replace(HtmlEntities, ""))) {
        console.warn('[WARN] Unresolved symbol(s) in "' + expr.replace(/\n/g, "\\n") + '" ');
      }
    }
    return this._postParse(expr, options) + (endingBreak ? "\n" : "");
  }
  /** @private */
  _printTokens(tokens) {
    let s = tokens.reduce((str, t) => {
      let { name } = t.tokenType;
      let tag = name;
      if (tag === "TEXT")
        tag = escapeText2(t.image, true);
      if (tag === "Symbol")
        tag = "sym(" + t.image + ")";
      if (tag === "TX")
        tag = "tx(" + t.image + ")";
      return str + tag + ", ";
    }, "").slice(0, -2);
    console.log("\nTokens: [ " + s + " ]\n");
  }
  /** @private */
  _preParse(script, opts) {
    if (typeof script !== "string")
      return "";
    const $ = this.Symbols;
    let input = script;
    if (!this.v2Compatible) {
      input = input.replace(this.regex.ParenthesizedWeights, "^$1^");
    }
    let matches = input.match(this.regex.MarkdownLinks);
    matches && matches.forEach((m) => input = input.replace(m, escapeMarkdownLink(m)));
    input = input.replace(this.regex.MultiLineComments, "");
    input = input.replace(this.regex.SingleLineComments, "");
    input = input.replace(this.regex.Continue, "");
    input = slashEscToEntities(input);
    let result = "";
    let lines = input.split(this.regex.LineBreaks);
    for (let i = 0; i < lines.length; i++) {
      if (this.regex.RawAssign.test(lines[i])) {
        let eqIdx = lines[i].indexOf("=");
        if (eqIdx < 0)
          throw Error("invalid state: no assigment: " + lines[i]);
        let lhs = lines[i].substring(0, eqIdx), rhs = lines[i].substring(eqIdx + 1);
        let opens = charCount(rhs, $.OPEN_CHOICE);
        let closes = charCount(rhs, $.CLOSE_CHOICE);
        while (opens > closes) {
          let line = lines[++i];
          rhs += "\n" + line;
          opens += charCount(line, $.OPEN_CHOICE);
          closes += charCount(line, $.CLOSE_CHOICE);
        }
        result += $.OPEN_SILENT + (lhs + "=" + rhs) + $.CLOSE_SILENT;
      } else {
        result += lines[i];
        if (i < lines.length - 1)
          result += "\n";
      }
    }
    return result;
  }
  /**
   * Creates a new RiQuery object from the raw query string
   * @package 
   */
  createQuery(rawQuery, opts) {
    return new RiQuery(this, rawQuery, opts);
  }
  /** @private */
  _postParse(input, opts) {
    if (typeof input !== "string")
      return "";
    let decoded = decode(input);
    let result = decoded.replace(this.regex.Whitespace, " ").replace(this.regex.EndingBreak, "");
    let gates = [...result.matchAll(this.pendingGateRe)];
    if (opts.trace && gates.length) {
      console.log("-".repeat(20) + " pGates " + "-".repeat(20));
    }
    this.visitor.order = 0;
    gates.forEach((g) => {
      if (!g || !g[0] || !g[1])
        throw Error("bad gate: " + g);
      let deferredGate = this.visitor.pendingGates[g[1]];
      if (!deferredGate)
        throw Error("no deferredGate: " + g[1]);
      let { deferredContext, operands, gateText } = deferredGate;
      if (!operands.length)
        throw Error("no operands");
      let reject = this.visitor.choice(deferredContext, { forceReject: true });
      result = result.replace(g[0], reject);
      if (opts.trace)
        console.log("Unresolved gate: '" + gateText + "' {reject}");
    });
    if (opts.trace)
      console.log(`
Final: '${result}'`);
    if (!opts.preserveLookups) {
      this.visitor.statics = void 0;
      this.visitor.dynamics = void 0;
    }
    return result;
  }
  /**
   * Parses a mingo query into JSON format
   * @package
   */
  parseJSOL(text) {
    const unescapeRegexProperty = (text2) => {
      const RegexEscape = Util.RegexEscape;
      let res = text2;
      if (typeof text2 === "string" && text2.startsWith(RegexEscape) && text2.endsWith(RegexEscape)) {
        let parts = text2.split(RegexEscape);
        if (parts.length !== 4)
          throw Error("invalid regex in unescape");
        res = new RegExp(parts[1], parts[2]);
      }
      return res;
    };
    let escaped = escapeJSONRegex(text).replace(this.regex.JSOLIdent, '"$1":').replace(/'/g, '"');
    let result = JSON.parse(escaped), urp = unescapeRegexProperty;
    Object.keys(result).forEach((k) => result[k] = urp(result[k]));
    return result;
  }
  /**
   * True if input contains parseable script
   * @private
   */
  isParseable(s) {
    let result = true;
    if (typeof s === "number") {
      s = s.toString();
    }
    if (typeof s === "string") {
      result = this.regex.Special.test(s) || s.includes(this.Symbols.PENDING_GATE);
    }
    return result;
  }
  // ========================= statics ===============================
  /**
   * Default transform that pluralizes a string (uses RiTa if available for phonemes)
   * @param {string} s - the string to transform
   * @param {object} [pluralizer] - custom pluralizer with pluralize() function
   * @returns {string} the transformed string
   * @private
   */
  static pluralize(s, pluralizer) {
    if (!pluralizer?.pluralize) {
      if (!_RiScript.RiTaWarnings.plurals && !_RiScript.RiTaWarnings.silent) {
        _RiScript.RiTaWarnings.plurals = true;
        console.warn("[WARN] Install RiTa for proper pluralization");
      }
      return s.endsWith("s") ? s : s + "s";
    }
    return pluralizer.pluralize(s);
  }
  /**
   * Default transform that adds an article (uses RiTa if available for phonemes)
   * @param {string} s - the string to transform
   * @param {object} [phonemeAnalyzer] - custom phoneme analyzer with phones() function
   * @returns {string} the transformed string
   * @private
   */
  static articlize(s, phonemeAnalyzer) {
    if (!s || !s.length)
      return "";
    let first = s.split(/\s+/)[0];
    if (!phonemeAnalyzer?.phones) {
      if (!_RiScript.RiTaWarnings.phones && !_RiScript.RiTaWarnings.silent) {
        console.warn("[WARN] Install RiTa for proper phonemes");
        _RiScript.RiTaWarnings.phones = true;
      }
      return (/^[aeiou].*/i.test(first) ? "an " : "a ") + s;
    }
    let phones = phonemeAnalyzer.phones(first, { silent: true });
    return (phones?.length && Vowels.test(phones[0]) ? "an " : "a ") + s;
  }
  /**
   * Default transform that uppercases the first character of the string
   * @param {string} s - the string to transform
   * @returns {string} the transformed string
   * @private
   */
  static capitalize(s) {
    return s ? s[0].toUpperCase() + s.substring(1) : "";
  }
  /**
   * Default transform that capitalizes the string
   * @param {string} s - the string to transform
   * @returns {string} the transformed string
   * @private
   */
  static uppercase(s) {
    return s ? s.toUpperCase() : "";
  }
  /**
   * Default transform that wraps the string in (smart) quotes.
   * @param {string} s - the string to transform
   * @returns {string} the transformed string
   * @private
   */
  static quotify(s) {
    return "&#8220;" + (s || "") + "&#8221;";
  }
  /**
   * Default no-op transform
   * @param {string} s - the string to transform
   * @returns {string} the transformed string
   * @private
   */
  static identity(s) {
    return s;
  }
  // ========================= helpers ===============================
  /** @private */
  _createRegexes(tokens) {
    const Esc = this.Escaped;
    const open = Esc.OPEN_CHOICE;
    const close = Esc.CLOSE_CHOICE;
    const anysym = Esc.STATIC + Esc.DYNAMIC;
    return {
      LineBreaks: /\r?\n/,
      EndingBreak: /\r?\n$/,
      NonGateAtSigns: /([^}])@(?!{)/,
      AnySymbol: new RegExp(`[${anysym}]`),
      ParenthesizedWeights: /\(\s*(\d+)\s*\)/g,
      // TODO: change for negative weights
      MultiLineComments: /\/\*[^]*?(\r?\n)?\//g,
      SingleLineComments: /\/\/[^\n]+(\r?\n|$)/g,
      MarkdownLinks: /\[([^\]]+)\]\(([^)"]+)(?: \"([^\"]+)\")?\)/g,
      RawAssign: new RegExp(`^[${anysym}][A-Za-z_0-9][A-Za-z_0-9]*\\s*=`),
      JSOLIdent: new RegExp(`([${anysym}]?[A-Za-z_0-9][A-Za-z_0-9]*)\\s*:`, "g"),
      ChoiceWrap: new RegExp("^" + open + "[^" + open + close + "]*" + close + "$"),
      ValidSymbol: new RegExp("(" + Esc.DYNAMIC + "|" + Esc.STATIC + "[A-Za-z_0-9])[A-Za-z_0-9]*"),
      Entity: tokens.filter((t) => t.name === "Entity")[0].PATTERN,
      StaticSymbol: new RegExp(Esc.STATIC + "[A-Za-z_0-9][A-Za-z_0-9]*"),
      Special: new RegExp(`[${Esc.SPECIAL.replace("&", "")}]`),
      Continue: new RegExp(Esc.CONTINUATION + "\\r?\\n", "g"),
      Whitespace: /[\u00a0\u2000-\u200b\u2028-\u2029\u3000]+/g
    };
  }
  /** @private */
  _createTransforms() {
    let transforms = {
      quotify: (w) => _RiScript.quotify(w),
      pluralize: (w) => _RiScript.pluralize(w, this.RiTa),
      articlize: (w) => _RiScript.articlize(w, this.RiTa),
      capitalize: (w) => _RiScript.capitalize(w),
      uppercase: (w) => _RiScript.uppercase(w),
      norepeat: (w) => _RiScript.identity(w)
    };
    transforms.art = transforms.articlize;
    transforms.nr = transforms.norepeat;
    transforms.cap = transforms.capitalize;
    transforms.uc = transforms.uppercase;
    transforms.qq = transforms.quotify;
    transforms.s = transforms.pluralize;
    transforms.ucf = transforms.capitalize;
    return transforms;
  }
};
/** @type {string} */
__publicField(_RiScript, "VERSION", "1.1.1");
/** @type {typeof RiQuery} */
__publicField(_RiScript, "Query", RiQuery);
/** @type {Object.<string, boolean>} */
__publicField(_RiScript, "RiTaWarnings", { plurals: false, phones: false, silent: false });
var RiScript = _RiScript;
function charCount(str, c) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === c)
      count++;
  }
  return count;
}
RiScript.Visitor = RiScriptVisitor;
RiScript.Util = Util;
export {
  RiGrammar,
  RiScript
};
//# sourceMappingURL=riscript.js.map