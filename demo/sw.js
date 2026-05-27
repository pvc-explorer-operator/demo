//#region dev-mock/data.ts
function e(e) {
	let t = /* @__PURE__ */ new Date();
	return t.setDate(t.getDate() - e), t.toISOString();
}
function t(t, n, r, i, a, o, s, c, l, u, d = "30m") {
	let f = Array.from({ length: c }, (e, n) => ({
		podName: `${t}-pod-${n}`,
		ownerKind: n % 2 == 0 ? "Deployment" : "StatefulSet",
		ownerName: `${t}-owner-${n}`,
		nodeName: `node-${n % 3 + 1}`,
		mountReadOnly: o === "ReadOnlyMany"
	}));
	return {
		metadata: {
			name: t,
			namespace: n,
			creationTimestamp: e(u),
			labels: {
				...s ? { "pvcexplorer.io/scope": s } : {},
				...l
			}
		},
		spec: {
			pvcName: r,
			scaling: { idleTimeout: d }
		},
		status: {
			phase: i,
			conditions: [{
				type: "Ready",
				status: i === "Running" ? "True" : "False",
				reason: i,
				message: `Explorer is ${i}`,
				lastTransitionTime: e(u)
			}],
			mount: {
				strategy: a,
				accessMode: o,
				consumers: f
			}
		}
	};
}
function n(t, n, r, i, a, o = "Label", s = "Retain") {
	return {
		metadata: {
			name: t,
			creationTimestamp: e(5),
			finalizers: ["pvcexplorer.io/scope-protection"]
		},
		spec: {
			deletionPolicy: s,
			discovery: { mode: o },
			namespaces: { names: a },
			scaling: { idleTimeout: "30m" }
		},
		status: {
			conditions: [{
				type: "Ready",
				status: n === "Ready" ? "True" : "False",
				reason: n,
				message: `Scope is ${n}`,
				lastTransitionTime: e(5)
			}],
			namespaceCount: r,
			explorerCount: i
		}
	};
}
var r = [
	n("team-alpha", "Ready", 3, 6, [
		"team-alpha",
		"team-alpha-staging",
		"team-alpha-dev"
	]),
	n("team-beta", "Ready", 2, 4, ["team-beta", "team-beta-staging"]),
	n("ml-workloads", "Ready", 1, 3, ["ml-ns"], "Label", "Delete"),
	n("degraded-env", "Degraded", 1, 1, ["degraded"])
], i = [
	t("alpha-data-explorer", "team-alpha", "alpha-data-pvc", "Running", "Mounted", "ReadWriteOnce", "team-alpha", 2, {
		app: "analytics",
		env: "prod"
	}, 10),
	t("alpha-logs-explorer", "team-alpha", "alpha-logs-pvc", "Running", "Mounted", "ReadWriteMany", "team-alpha", 3, {
		app: "logging",
		env: "prod"
	}, 7),
	t("beta-ml-explorer", "team-beta", "beta-ml-pvc", "Running", "Mounted", "ReadWriteOnce", "team-beta", 1, {
		app: "ml",
		tier: "train"
	}, 3),
	t("beta-shared-explorer", "team-beta", "beta-shared-pvc", "Running", "Mounted", "ReadOnlyMany", "team-beta", 5, {
		app: "shared",
		tier: "serve"
	}, 1),
	t("alpha-archive-explorer", "team-alpha", "alpha-archive-pvc", "ScaledToZero", "Unmounted", "ReadWriteOnce", "team-alpha", 0, {
		app: "archive",
		env: "prod"
	}, 30),
	t("beta-cold-explorer", "team-beta", "beta-cold-pvc", "ScaledToZero", "Unmounted", "ReadWriteOnce", "team-beta", 0, {
		app: "cold",
		tier: "store"
	}, 45),
	t("ml-checkpoint-explorer", "ml-ns", "ml-checkpoint-pvc", "ScaledToZero", "Unmounted", "ReadWriteMany", "ml-workloads", 0, {
		app: "ml",
		stage: "ckpt"
	}, 14),
	t("alpha-waking-explorer", "team-alpha", "alpha-waking-pvc", "Waking", "Mounting", "ReadWriteOnce", "team-alpha", 0, {
		app: "analytics",
		env: "staging"
	}, 5),
	t("ml-waking-explorer", "ml-ns", "ml-waking-pvc", "Waking", "Mounting", "ReadWriteOnce", "ml-workloads", 0, {
		app: "ml",
		stage: "eval"
	}, 2),
	t("beta-pending-explorer", "team-beta", "beta-pending-pvc", "Pending", "Pending", "ReadWriteOnce", "team-beta", 0, {
		app: "ml",
		env: "staging"
	}, 0),
	t("infra-pending-explorer", "infra", "infra-pending-pvc", "Pending", "Pending", "ReadWriteOnce", null, 0, { team: "infra" }, 0),
	t("alpha-failed-explorer", "team-alpha", "alpha-failed-pvc", "Failed", "Failed", "ReadWriteOnce", "team-alpha", 0, {
		app: "analytics",
		env: "prod"
	}, 2),
	t("degraded-explorer", "degraded", "degraded-pvc", "Failed", "Failed", "ReadWriteOnce", "degraded-env", 0, { team: "ops" }, 1),
	t("ml-active-explorer", "ml-ns", "ml-active-pvc", "Running", "Mounted", "ReadWriteMany", "ml-workloads", 4, {
		app: "ml",
		stage: "train",
		env: "prod"
	}, 1, "1h"),
	t("infra-nfs-explorer", "infra", "infra-nfs-pvc", "Running", "Mounted", "ReadOnlyMany", null, 2, {
		team: "infra",
		type: "nfs"
	}, 60),
	t("orphan-explorer", "default", "orphan-pvc", "ScaledToZero", "Unmounted", "ReadWriteOnce", null, 0, { app: "orphan" }, 90),
	t("solo-running-explorer", "default", "solo-pvc", "Running", "Mounted", "ReadWriteOnce", null, 1, {
		app: "solo",
		env: "dev"
	}, 20)
], a = /* @__PURE__ */ new Map();
function o(e, t) {
	a.set(e, {
		content: t,
		size: t.length,
		modTime: (/* @__PURE__ */ new Date()).toISOString(),
		isDir: !1
	});
}
function s(e) {
	a.set(e, {
		content: "",
		size: 0,
		modTime: (/* @__PURE__ */ new Date()).toISOString(),
		isDir: !0
	});
}
s("config"), s("data"), s("logs"), o("README.md", "# Mock PVC\n\nThis is a **demo** filesystem.\n\nEdit me and press Ctrl+S to save.\n"), o("config/app.yaml", "server:\n  port: 8080\n  debug: true\n\ndatabase:\n  host: postgres\n  port: 5432\n  name: myapp\n"), o("config/secret.env", "DATABASE_URL=postgres://user:pass@localhost/myapp\nSECRET_KEY=demo-only-secret\n"), o("data/sample.json", JSON.stringify({
	version: 1,
	items: [{
		id: 1,
		name: "foo"
	}, {
		id: 2,
		name: "bar"
	}]
}, null, 2) + "\n"), o("data/query.sql", "SELECT id, name, created_at\nFROM items\nWHERE active = true\nORDER BY created_at DESC\nLIMIT 100;\n"), o("logs/app.log", "2026-05-23T10:00:00Z INFO  Server started port=8080\n2026-05-23T10:01:00Z INFO  Request GET /health\n2026-05-23T10:02:00Z WARN  Slow query duration=320ms\n");
function c(e) {
	let t = e ? e + "/" : "", n = /* @__PURE__ */ new Set(), r = [];
	for (let [e] of a.entries()) {
		if (!e.startsWith(t)) continue;
		let i = e.slice(t.length);
		if (!i) continue;
		let o = i.split("/")[0];
		if (n.has(o)) continue;
		n.add(o);
		let s = t + o, c = a.get(s);
		r.push({
			name: o,
			isDir: c ? c.isDir : i.includes("/"),
			size: c ? c.size : 0,
			modTime: c ? c.modTime : (/* @__PURE__ */ new Date()).toISOString()
		});
	}
	return r;
}
function l(e, t = 200) {
	return new Response(JSON.stringify(e), {
		status: t,
		headers: { "Content-Type": "application/json" }
	});
}
function u() {
	return new Response(null, { status: 204 });
}
async function d(e) {
	let t = new URL(e.url), n = t.pathname, o = e.method.toUpperCase();
	if (n === "/api/v1/auth/me" && o === "GET" || n === "/api/v1/auth/login" && o === "POST") return l({
		username: "demo",
		role: "admin"
	});
	if (n === "/api/v1/auth/logout" && o === "POST") return u();
	if (n === "/api/version" && o === "GET") return new Response("demo", { headers: { "Content-Type": "text/plain; charset=utf-8" } });
	if (n === "/api/v1/namespaces" && o === "GET") return l([...new Set(i.map((e) => e.metadata.namespace))]);
	let s = n.match(/^\/api\/v1\/namespaces\/([^/]+)\/pvcs$/);
	if (s && o === "GET") {
		let e = decodeURIComponent(s[1]);
		return l(i.filter((t) => t.metadata.namespace === e).map((e) => e.spec.pvcName));
	}
	if (n === "/api/v1/scopes" && o === "GET") return l(r);
	if (n === "/api/v1/scopes" && o === "POST") return l({}, 201);
	let d = n.match(/^\/api\/v1\/scopes\/([^/]+)$/);
	if (d && o === "GET") {
		let e = r.find((e) => e.metadata.name === decodeURIComponent(d[1]));
		return e ? l(e) : l({ error: "not found" }, 404);
	}
	let f = n.match(/^\/api\/v1\/explorers\/([^/]+)\/([^/]+)\/proxy\/api\/([^?]*)/);
	if (f) {
		let n = f[3], r = t.searchParams.get("path") ?? "";
		if (n === "config") return l({
			readonly: !1,
			forceRW: !1,
			pvc: "mock-pvc",
			namespace: "demo",
			pod: "mock-pod",
			cluster: "demo",
			version: "demo"
		});
		if (n === "files") {
			if (o === "GET") return l({ entries: c(r) });
			if (o === "DELETE") {
				for (let e of [...a.keys()]) (e === r || e.startsWith(r + "/")) && a.delete(e);
				return u();
			}
		}
		if (n === "download" && o === "GET") {
			let e = a.get(r);
			return !e || e.isDir ? new Response("not found", { status: 404 }) : new Response(e.content, { headers: {
				"Content-Type": "application/octet-stream",
				"Content-Disposition": "attachment; filename=\"" + (r.split("/").pop() ?? "file") + "\""
			} });
		}
		if (n === "edit" && (o === "PUT" || o === "POST")) {
			let t = await e.text();
			return a.set(r, {
				content: t,
				size: t.length,
				modTime: (/* @__PURE__ */ new Date()).toISOString(),
				isDir: !1
			}), u();
		}
		if (n === "rename" && o === "POST") {
			let { from: t, to: n } = await e.json(), r = a.get(t);
			return r && (a.set(n, r), a.delete(t)), u();
		}
		return n === "upload" && o === "POST" ? u() : new Response("not found", { status: 404 });
	}
	if (n.match(/^\/api\/v1\/explorers\/([^/]+)\/([^/]+)\/heartbeat$/)) return l({
		remainingSeconds: 600,
		phase: "Running"
	});
	if (n.match(/^\/api\/v1\/explorers\/([^/]+)\/([^/]+)\/(wake|sleep)$/) && o === "POST") return u();
	if (n === "/api/v1/explorers" && o === "POST") return l({}, 201);
	let p = n.match(/^\/api\/v1\/explorers\/([^/]+)\/([^/]+)$/);
	if (p && o === "GET") {
		let e = i.find((e) => e.metadata.namespace === decodeURIComponent(p[1]) && e.metadata.name === decodeURIComponent(p[2]));
		return e ? l(e) : l({ error: "not found" }, 404);
	}
	return n === "/api/v1/explorers" && o === "GET" ? l(i) : null;
}
self.addEventListener("install", () => self.skipWaiting()), self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim())), self.addEventListener("fetch", (e) => {
	new URL(e.request.url).pathname.startsWith("/api/") && e.respondWith(d(e.request).then((t) => t ?? fetch(e.request)));
});
//#endregion
