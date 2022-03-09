!function(e) {
    var t = {};
    function r(i) {
        if (t[i])
            return t[i].exports;
        var n = t[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return e[i].call(n.exports, n, n.exports, r),
            n.l = !0,
            n.exports
    }
    r.m = e,
        r.c = t,
        r.d = function(e, t, i) {
            r.o(e, t) || Object.defineProperty(e, t, {
                enumerable: !0,
                get: i
            })
        }
        ,
        r.r = function(e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                value: "Module"
            }),
                Object.defineProperty(e, "__esModule", {
                    value: !0
                })
        }
        ,
        r.t = function(e, t) {
            if (1 & t && (e = r(e)),
            8 & t)
                return e;
            if (4 & t && "object" == typeof e && e && e.__esModule)
                return e;
            var i = Object.create(null);
            if (r.r(i),
                Object.defineProperty(i, "default", {
                    enumerable: !0,
                    value: e
                }),
            2 & t && "string" != typeof e)
                for (var n in e)
                    r.d(i, n, function(t) {
                        return e[t]
                    }
                        .bind(null, n));
            return i
        }
        ,
        r.n = function(e) {
            var t = e && e.__esModule ? function() {
                        return e.default
                    }
                    : function() {
                        return e
                    }
            ;
            return r.d(t, "a", t),
                t
        }
        ,
        r.o = function(e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }
        ,
        r.p = "",
        r(r.s = 0)
}([function(e, t) {
    class r {
        static createAndMountIframe({url: e, id: t, elementId: r}) {
            const i = document.createElement("iframe");
            i.id = t,
                i.src = e,
                i.width = "100%",
                i.height = "100%",
                i.style.border = 0;
            return document.getElementById(r).appendChild(i),
                i
        }
        static encodeParams(e) {
            return Object.keys(e).filter(t=>void 0 !== e[t]).map(t=>`${t}=${encodeURIComponent(e[t])}`).join("&")
        }
        static combineRenderUrl(e, t) {
            return `${r.combineUrl(e, "/magno/render/card/subscription")}?${r.encodeParams(t)}`
        }
        static combineUrl(e, t) {
            return e.endsWith("/") && (e = e.slice(0, -1)),
                `${e}${t}`
        }
        static setCookie(e, t) {
            document.cookie = e + "=" + (t || "") + "; path=/"
        }
    }
    class i {
        constructor({domain: e, tenant: t, elementId: r, cardList: i, pageSize: n, containerWidth: s, cardHeight: a, gutter: d, bgColor: h, view: o, ak: c, sk: l}) {
            if (this.domain = e,
                this.tenant = t,
                this.elementId = r,
                this.pageSize = n,
                this.cardList = i,
                this.cardHeight = a,
                this.pagePadding = d,
                this.cardGutter = d,
                this.bgColor = h,
                this.view = o,
                this.ak = c,
                this.sk = l,
                !t)
                throw "tenant is required";
            if (!c)
                throw "ak is required";
            if (!l)
                throw "sk is required";
            if (!r)
                throw "elementId is required";
            if (!i || 0 === i.length)
                throw "cardList is required and must not be empty";
            if (void 0 === e)
                throw "domain is required";
            if (!n)
                throw "pageSize is required";
            if (!s)
                throw "containerWidth is required";
            this.containerWidth = s,
            a || (this.cardHeight = 300),
            null == d && (this.pagePadding = 16,
                this.cardGutter = 16),
                this.cardWidth = Math.ceil((s - (n + 1) * d) / n),
            h || (this.bgColor = "white"),
            o || (this.view = this.INLINE_VIEW),
                this.view === this.INLINE_VIEW ? (this.setViewHeight(this.inline_view_height),
                    this.resetCurrentPage()) : this.view === this.GRID_VIEW && this.setViewHeight(this.grid_view_height),
                this.setViewWidth(this.view_width),
                this.startRefreshToken(12e5)
        }
        static initRender({domain: e, tenant: t, elementId: r, cardList: n, pageSize: s, containerWidth: a, cardHeight: d, gutter: h, bgColor: o, view: c, ak: l, sk: g}) {
            return new i({
                domain: e,
                tenant: t,
                elementId: r,
                cardList: n,
                pageSize: s,
                containerWidth: a,
                cardHeight: d,
                gutter: h,
                bgColor: o,
                view: c,
                ak: l,
                sk: g
            })
        }
        static combineSingleCardViewUrl({domain: e, tenant: t, card: i, cardWidth: n, cardHeight: s, extraParams: a}) {
            if (void 0 === e)
                throw "domain is required";
            if (!t)
                throw "tenant is required";
            if (!i)
                throw "card is required";
            if (!n)
                throw "cardWidth is required";
            if (!s)
                throw "cardHeight is required";
            const d = {
                pageSize: 1,
                cardList: [i],
                tenant: t,
                cardWidth: n,
                cardHeight: s,
                pagePadding: 0,
                cardGutter: 0,
                bgColor: "white",
                show: !0,
                extraParams: JSON.stringify(a)
            };
            return r.combineRenderUrl(e, d)
        }
        get INLINE_VIEW() {
            return "inline"
        }
        get GRID_VIEW() {
            return "grid"
        }
        get RENDERED_ATTRIBUTE() {
            return "rendered"
        }
        get total_page_count() {
            let e = parseInt(this.cardList.length / this.pageSize);
            return this.cardList.length % this.pageSize > 0 && (e += 1),
                e
        }
        get inline_view_height() {
            return this.cardHeight + 2 * this.pagePadding
        }
        get grid_view_height() {
            const e = this.total_page_count;
            return this.cardHeight * e + (e - 1) * this.cardGutter + 2 * this.pagePadding
        }
        get view_width() {
            return this.cardWidth * this.pageSize + (this.pageSize - 1) * this.cardGutter + 2 * this.pagePadding
        }
        get container() {
            return this.document.getElementById("sub_layout_grid")
        }
        get window() {
            return this.frame.contentWindow
        }
        get document() {
            return this.window.document
        }
        get renderParams() {
            return {
                pageSize: this.pageSize,
                cardList: this.cardList.join(","),
                tenant: this.tenant,
                cardWidth: this.cardWidth,
                cardHeight: this.cardHeight,
                pagePadding: this.pagePadding,
                cardGutter: this.cardGutter,
                bgColor: this.bgColor
            }
        }
        get scrollLeftPosiotion() {
            const e = this.pageSize * (this.currentPage - 1);
            return this.cardWidth * e + this.cardGutter * (e - 1) + this.pagePadding
        }
        get renderUrl() {
            return r.combineRenderUrl(this.domain, this.renderParams)
        }
        get hasNextPage() {
            return this.view === this.INLINE_VIEW && this.currentPage < this.total_page_count
        }
        get hasPrevPage() {
            return this.view === this.INLINE_VIEW && this.currentPage > 1
        }
        range(e, t) {
            return new Array(t - e).fill(1).map((t,r)=>r + e)
        }
        async refreshToken() {
            const e = r.combineUrl(this.domain, "/baas/auth/v1.0/oauth2/token")
                , t = await fetch(e, {
                method: "POST",
                body: r.encodeParams({
                    grant_type: "client_credentials",
                    client_id: this.ak,
                    client_secret: this.sk
                }),
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(e=>e.json());
            t.access_token ? r.setCookie("access-token", t.access_token) : console.error("fail to refresh token")
        }
        startRefreshToken(e) {
            this.stopRefreshToken(),
                this.refreshToken(),
                this.refreshTokenInterval = setInterval(()=>{
                        this.refreshToken()
                    }
                    , e)
        }
        stopRefreshToken() {
            this.refreshTokenInterval && clearInterval(this.refreshTokenInterval)
        }
        async render() {
            if (this.frame)
                return;
            this.frame = r.createAndMountIframe({
                url: this.renderUrl,
                id: "subscriptionCardRenderFrame",
                elementId: this.elementId
            }),
                await this.waitForPageLoaded(),
                await this.renderCardsByIndexRange(1, this.pageSize),
                this.changeView(this.view);
            this.cardList.length - this.pageSize > 0 && this.renderCardsByIndexRange(this.pageSize + 1, this.cardList.length)
        }
        renderCells() {
            this.window.readerObj.studioPageObj.renderCells()
        }
        getCardById(e) {
            return this.document.getElementById(e)
        }
        async waitForPageLoaded(e=6e4) {
            return new Promise((t,r)=>{
                    const i = e / 100;
                    let n = 0;
                    const s = setInterval(()=>{
                            n += 1,
                            n > i && (clearInterval(s),
                                r("load page timeout " + e)),
                            this.window && this.window.readerObj && this.window.readerObj.studioPageObj && this.window.readerObj.studioPageObj.renderCells && (clearInterval(s),
                                t(!0))
                        }
                        , 100)
                }
            )
        }
        async waitForRenderd(e, t=3e3) {
            return new Promise((r,i)=>{
                    const n = t / 100;
                    let s = 0;
                    const a = setInterval(()=>{
                            s += 1,
                            s > n && (clearInterval(a),
                                i("render timeout " + t));
                            "true" === this.getCardById(e).getAttribute(this.RENDERED_ATTRIBUTE) && (clearInterval(a),
                                r(!0))
                        }
                        , 100)
                }
            )
        }
        async renderCard(e) {
            const t = this.getCardById(e);
            t && (t.setAttribute(this.RENDERED_ATTRIBUTE, "false"),
                this.renderCells(),
                await this.waitForRenderd(e))
        }
        getIdByIndex(e) {
            return "skPageLayoutCell_1_id-" + e
        }
        async renderCardByIndex(e) {
            const t = this.getIdByIndex(e);
            await this.renderCard(t)
        }
        async renderCardsByIndexRange(e, t) {
            await Promise.all(this.range(e, t + 1).map(e=>this.renderCardByIndex(e)))
        }
        scrollToCurrentPage() {
            this.container.scroll({
                top: 0,
                left: this.scrollLeftPosiotion,
                behavior: "smooth"
            })
        }
        nextPage() {
            this.hasNextPage && (this.currentPage += 1,
                this.scrollToCurrentPage())
        }
        prevPage() {
            this.hasPrevPage && (this.currentPage -= 1,
                this.scrollToCurrentPage())
        }
        setInlineView() {
            this.container.style.flexWrap = "nowrap",
                this.setViewHeight(this.inline_view_height),
                Array.from(this.document.getElementsByClassName("sub_layout_row")).forEach(e=>{
                        e.style.marginBottom = "0"
                    }
                ),
                this.view = this.INLINE_VIEW
        }
        resetCurrentPage() {
            this.currentPage = 1
        }
        setGridView() {
            this.container.style.flexWrap = "wrap",
                this.setViewHeight(this.grid_view_height);
            Array.from(this.document.getElementsByClassName("sub_layout_row")).slice(0, -1).forEach(e=>{
                    e.style.marginBottom = this.cardGutter + "px"
                }
            ),
                this.view = this.GRID_VIEW
        }
        changeView(e) {
            switch (e) {
                case this.INLINE_VIEW:
                    this.setInlineView();
                    break;
                case this.GRID_VIEW:
                    this.setGridView()
            }
            this.resetCurrentPage(),
                this.scrollToCurrentPage()
        }
        toggleView() {
            this.view === this.INLINE_VIEW ? this.changeView(this.GRID_VIEW) : this.changeView(this.INLINE_VIEW)
        }
        setViewHeight(e) {
            document.getElementById(this.elementId).style.height = e + "px"
        }
        setViewWidth(e) {
            document.getElementById(this.elementId).style.width = e + "px"
        }
    }
    window.AppCubeRender = {
        renderCard: class {
            static async renderCard(e) {
                const t = e.domain
                    , i = e.cardList
                    , n = e.divId;
                if (!t)
                    return;
                if (!i || !i.length)
                    return;
                const s = i[0].tenantId;
                let a = "";
                for (let e = 0; e < i.length; e++)
                    a += i[e].cardId + ",";
                a = a.substr(0, a.length - 1);
                const d = `${t}/magno/render/card/${s}/${a}`;
                r.createAndMountIframe({
                    url: d,
                    id: "cardRenderFrame",
                    elementId: n
                })
            }
        }
            .renderCard,
        initSubscriptionCardRender: i.initRender,
        combineSingleCardViewUrl: i.combineSingleCardViewUrl
    }
}
]);
