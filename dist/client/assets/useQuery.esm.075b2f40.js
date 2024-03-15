import{S as V,s as w,n as q,i as P,c as D,t as N,f as W,d as z,e as k,g as H,h as m,r as p,k as G,p as J}from"./index.db0549a5.js";class X extends V{constructor(e,t){super(),this.client=e,this.options=t,this.trackedProps=new Set,this.selectError=null,this.bindMethods(),this.setOptions(t)}bindMethods(){this.remove=this.remove.bind(this),this.refetch=this.refetch.bind(this)}onSubscribe(){this.listeners.length===1&&(this.currentQuery.addObserver(this),M(this.currentQuery,this.options)&&this.executeFetch(),this.updateTimers())}onUnsubscribe(){this.listeners.length||this.destroy()}shouldFetchOnReconnect(){return C(this.currentQuery,this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return C(this.currentQuery,this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=[],this.clearStaleTimeout(),this.clearRefetchInterval(),this.currentQuery.removeObserver(this)}setOptions(e,t){const n=this.options,i=this.currentQuery;if(this.options=this.client.defaultQueryOptions(e),w(n,this.options)||this.client.getQueryCache().notify({type:"observerOptionsUpdated",query:this.currentQuery,observer:this}),typeof this.options.enabled<"u"&&typeof this.options.enabled!="boolean")throw new Error("Expected enabled to be a boolean");this.options.queryKey||(this.options.queryKey=n.queryKey),this.updateQuery();const s=this.hasListeners();s&&L(this.currentQuery,i,this.options,n)&&this.executeFetch(),this.updateResult(t),s&&(this.currentQuery!==i||this.options.enabled!==n.enabled||this.options.staleTime!==n.staleTime)&&this.updateStaleTimeout();const u=this.computeRefetchInterval();s&&(this.currentQuery!==i||this.options.enabled!==n.enabled||u!==this.currentRefetchInterval)&&this.updateRefetchInterval(u)}getOptimisticResult(e){const t=this.client.getQueryCache().build(this.client,e);return this.createResult(t,e)}getCurrentResult(){return this.currentResult}trackResult(e){const t={};return Object.keys(e).forEach(n=>{Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:()=>(this.trackedProps.add(n),e[n])})}),t}getCurrentQuery(){return this.currentQuery}remove(){this.client.getQueryCache().remove(this.currentQuery)}refetch({refetchPage:e,...t}={}){return this.fetch({...t,meta:{refetchPage:e}})}fetchOptimistic(e){const t=this.client.defaultQueryOptions(e),n=this.client.getQueryCache().build(this.client,t);return n.isFetchingOptimistic=!0,n.fetch().then(()=>this.createResult(n,t))}fetch(e){var t;return this.executeFetch({...e,cancelRefetch:(t=e.cancelRefetch)!=null?t:!0}).then(()=>(this.updateResult(),this.currentResult))}executeFetch(e){this.updateQuery();let t=this.currentQuery.fetch(this.options,e);return e!=null&&e.throwOnError||(t=t.catch(q)),t}updateStaleTimeout(){if(this.clearStaleTimeout(),P||this.currentResult.isStale||!D(this.options.staleTime))return;const t=N(this.currentResult.dataUpdatedAt,this.options.staleTime)+1;this.staleTimeoutId=setTimeout(()=>{this.currentResult.isStale||this.updateResult()},t)}computeRefetchInterval(){var e;return typeof this.options.refetchInterval=="function"?this.options.refetchInterval(this.currentResult.data,this.currentQuery):(e=this.options.refetchInterval)!=null?e:!1}updateRefetchInterval(e){this.clearRefetchInterval(),this.currentRefetchInterval=e,!(P||this.options.enabled===!1||!D(this.currentRefetchInterval)||this.currentRefetchInterval===0)&&(this.refetchIntervalId=setInterval(()=>{(this.options.refetchIntervalInBackground||W.isFocused())&&this.executeFetch()},this.currentRefetchInterval))}updateTimers(){this.updateStaleTimeout(),this.updateRefetchInterval(this.computeRefetchInterval())}clearStaleTimeout(){this.staleTimeoutId&&(clearTimeout(this.staleTimeoutId),this.staleTimeoutId=void 0)}clearRefetchInterval(){this.refetchIntervalId&&(clearInterval(this.refetchIntervalId),this.refetchIntervalId=void 0)}createResult(e,t){const n=this.currentQuery,i=this.options,s=this.currentResult,u=this.currentResultState,a=this.currentResultOptions,c=e!==n,f=c?e.state:this.currentQueryInitialState,y=c?this.currentResult:this.previousQueryResult,{state:o}=e;let{dataUpdatedAt:S,error:x,errorUpdatedAt:T,fetchStatus:v,status:d}=o,F=!1,U=!1,h;if(t._optimisticResults){const l=this.hasListeners(),E=!l&&M(e,t),K=l&&L(e,n,t,i);(E||K)&&(v=z(e.options.networkMode)?"fetching":"paused",S||(d="loading")),t._optimisticResults==="isRestoring"&&(v="idle")}if(t.keepPreviousData&&!o.dataUpdateCount&&y!=null&&y.isSuccess&&d!=="error")h=y.data,S=y.dataUpdatedAt,d=y.status,F=!0;else if(t.select&&typeof o.data<"u")if(s&&o.data===(u==null?void 0:u.data)&&t.select===this.selectFn)h=this.selectResult;else try{this.selectFn=t.select,h=t.select(o.data),h=k(s==null?void 0:s.data,h,t),this.selectResult=h,this.selectError=null}catch(l){this.selectError=l}else h=o.data;if(typeof t.placeholderData<"u"&&typeof h>"u"&&d==="loading"){let l;if(s!=null&&s.isPlaceholderData&&t.placeholderData===(a==null?void 0:a.placeholderData))l=s.data;else if(l=typeof t.placeholderData=="function"?t.placeholderData():t.placeholderData,t.select&&typeof l<"u")try{l=t.select(l),l=k(s==null?void 0:s.data,l,t),this.selectError=null}catch(E){this.selectError=E}typeof l<"u"&&(d="success",h=l,U=!0)}this.selectError&&(x=this.selectError,h=this.selectResult,T=Date.now(),d="error");const g=v==="fetching",b=d==="loading",Q=d==="error";return{status:d,fetchStatus:v,isLoading:b,isSuccess:d==="success",isError:Q,isInitialLoading:b&&g,data:h,dataUpdatedAt:S,error:x,errorUpdatedAt:T,failureCount:o.fetchFailureCount,errorUpdateCount:o.errorUpdateCount,isFetched:o.dataUpdateCount>0||o.errorUpdateCount>0,isFetchedAfterMount:o.dataUpdateCount>f.dataUpdateCount||o.errorUpdateCount>f.errorUpdateCount,isFetching:g,isRefetching:g&&!b,isLoadingError:Q&&o.dataUpdatedAt===0,isPaused:v==="paused",isPlaceholderData:U,isPreviousData:F,isRefetchError:Q&&o.dataUpdatedAt!==0,isStale:I(e,t),refetch:this.refetch,remove:this.remove}}updateResult(e){const t=this.currentResult,n=this.createResult(this.currentQuery,this.options);if(this.currentResultState=this.currentQuery.state,this.currentResultOptions=this.options,w(n,t))return;this.currentResult=n;const i={cache:!0},s=()=>{if(!t)return!0;const{notifyOnChangeProps:u}=this.options;if(u==="all"||!u&&!this.trackedProps.size)return!0;const a=new Set(u!=null?u:this.trackedProps);return this.options.useErrorBoundary&&a.add("error"),Object.keys(this.currentResult).some(c=>{const f=c;return this.currentResult[f]!==t[f]&&a.has(f)})};(e==null?void 0:e.listeners)!==!1&&s()&&(i.listeners=!0),this.notify({...i,...e})}updateQuery(){const e=this.client.getQueryCache().build(this.client,this.options);if(e===this.currentQuery)return;const t=this.currentQuery;this.currentQuery=e,this.currentQueryInitialState=e.state,this.previousQueryResult=this.currentResult,this.hasListeners()&&(t==null||t.removeObserver(this),e.addObserver(this))}onQueryUpdate(e){const t={};e.type==="success"?t.onSuccess=!e.manual:e.type==="error"&&!H(e.error)&&(t.onError=!0),this.updateResult(t),this.hasListeners()&&this.updateTimers()}notify(e){m.batch(()=>{if(e.onSuccess){var t,n,i,s;(t=(n=this.options).onSuccess)==null||t.call(n,this.currentResult.data),(i=(s=this.options).onSettled)==null||i.call(s,this.currentResult.data,null)}else if(e.onError){var u,a,c,f;(u=(a=this.options).onError)==null||u.call(a,this.currentResult.error),(c=(f=this.options).onSettled)==null||c.call(f,void 0,this.currentResult.error)}e.listeners&&this.listeners.forEach(y=>{y(this.currentResult)}),e.cache&&this.client.getQueryCache().notify({query:this.currentQuery,type:"observerResultsUpdated"})})}}function Y(r,e){return e.enabled!==!1&&!r.state.dataUpdatedAt&&!(r.state.status==="error"&&e.retryOnMount===!1)}function M(r,e){return Y(r,e)||r.state.dataUpdatedAt>0&&C(r,e,e.refetchOnMount)}function C(r,e,t){if(e.enabled!==!1){const n=typeof t=="function"?t(r):t;return n==="always"||n!==!1&&I(r,e)}return!1}function L(r,e,t,n){return t.enabled!==!1&&(r!==e||n.enabled===!1)&&(!t.suspense||r.state.status!=="error")&&I(r,t)}function I(r,e){return r.isStaleByTime(e.staleTime)}var A={exports:{}},B={};/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var R=p.exports;function Z(r,e){return r===e&&(r!==0||1/r===1/e)||r!==r&&e!==e}var _=typeof Object.is=="function"?Object.is:Z,$=R.useState,ee=R.useEffect,te=R.useLayoutEffect,re=R.useDebugValue;function se(r,e){var t=e(),n=$({inst:{value:t,getSnapshot:e}}),i=n[0].inst,s=n[1];return te(function(){i.value=t,i.getSnapshot=e,O(i)&&s({inst:i})},[r,t,e]),ee(function(){return O(i)&&s({inst:i}),r(function(){O(i)&&s({inst:i})})},[r]),re(t),t}function O(r){var e=r.getSnapshot;r=r.value;try{var t=e();return!_(r,t)}catch{return!0}}function ne(r,e){return e()}var ie=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?ne:se;B.useSyncExternalStore=R.useSyncExternalStore!==void 0?R.useSyncExternalStore:ie;(function(r){r.exports=B})(A);const ue=A.exports.useSyncExternalStore,j=p.exports.createContext(!1),ae=()=>p.exports.useContext(j);j.Provider;function ce(){let r=!1;return{clearReset:()=>{r=!1},reset:()=>{r=!0},isReset:()=>r}}const oe=p.exports.createContext(ce()),le=()=>p.exports.useContext(oe);function he(r,e){return typeof r=="function"?r(...e):!!r}const de=(r,e)=>{(r.suspense||r.useErrorBoundary)&&(e.isReset()||(r.retryOnMount=!1))},fe=r=>{p.exports.useEffect(()=>{r.clearReset()},[r])},pe=({result:r,errorResetBoundary:e,useErrorBoundary:t,query:n})=>r.isError&&!e.isReset()&&!r.isFetching&&he(t,[r.error,n]);function ye(r,e){const t=G({context:r.context}),n=ae(),i=le(),s=t.defaultQueryOptions(r);s._optimisticResults=n?"isRestoring":"optimistic",s.onError&&(s.onError=m.batchCalls(s.onError)),s.onSuccess&&(s.onSuccess=m.batchCalls(s.onSuccess)),s.onSettled&&(s.onSettled=m.batchCalls(s.onSettled)),s.suspense&&typeof s.staleTime!="number"&&(s.staleTime=1e3),de(s,i),fe(i);const[u]=p.exports.useState(()=>new e(t,s)),a=u.getOptimisticResult(s);if(ue(p.exports.useCallback(c=>n?()=>{}:u.subscribe(m.batchCalls(c)),[u,n]),()=>u.getCurrentResult(),()=>u.getCurrentResult()),p.exports.useEffect(()=>{u.setOptions(s,{listeners:!1})},[s,u]),s.suspense&&a.isLoading&&a.isFetching&&!n)throw u.fetchOptimistic(s).then(({data:c})=>{s.onSuccess==null||s.onSuccess(c),s.onSettled==null||s.onSettled(c,null)}).catch(c=>{i.clearReset(),s.onError==null||s.onError(c),s.onSettled==null||s.onSettled(void 0,c)});if(pe({result:a,errorResetBoundary:i,useErrorBoundary:s.useErrorBoundary,query:u.getCurrentQuery()}))throw a.error;return s.notifyOnChangeProps?a:u.trackResult(a)}function me(r,e,t){const n=J(r,e,t);return ye(n,X)}export{me as u};
