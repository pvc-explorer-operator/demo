import{Dt as e,Et as t,Ft as n,Lt as r,M as i,Mt as a,Nt as o,Pt as s,S as c,Vt as l,Xt as u,Zt as d,a as f,b as p,kt as m,p as h,qt as g,st as _,t as v,tn as y,v as b,zt as x}from"./index-BQ14s4me.js";import{t as S}from"./message-h7pTLtoH.js";var C=i.extend({name:`toggleswitch`,style:`
    .p-toggleswitch {
        display: inline-block;
        width: dt('toggleswitch.width');
        height: dt('toggleswitch.height');
    }

    .p-toggleswitch-input {
        cursor: pointer;
        appearance: none;
        position: absolute;
        top: 0;
        inset-inline-start: 0;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        opacity: 0;
        z-index: 1;
        outline: 0 none;
        border-radius: dt('toggleswitch.border.radius');
    }

    .p-toggleswitch-slider {
        cursor: pointer;
        width: 100%;
        height: 100%;
        border-width: dt('toggleswitch.border.width');
        border-style: solid;
        border-color: dt('toggleswitch.border.color');
        background: dt('toggleswitch.background');
        transition:
            background dt('toggleswitch.transition.duration'),
            color dt('toggleswitch.transition.duration'),
            border-color dt('toggleswitch.transition.duration'),
            outline-color dt('toggleswitch.transition.duration'),
            box-shadow dt('toggleswitch.transition.duration');
        border-radius: dt('toggleswitch.border.radius');
        outline-color: transparent;
        box-shadow: dt('toggleswitch.shadow');
    }

    .p-toggleswitch-handle {
        position: absolute;
        top: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: dt('toggleswitch.handle.background');
        color: dt('toggleswitch.handle.color');
        width: dt('toggleswitch.handle.size');
        height: dt('toggleswitch.handle.size');
        inset-inline-start: dt('toggleswitch.gap');
        margin-block-start: calc(-1 * calc(dt('toggleswitch.handle.size') / 2));
        border-radius: dt('toggleswitch.handle.border.radius');
        transition:
            background dt('toggleswitch.transition.duration'),
            color dt('toggleswitch.transition.duration'),
            inset-inline-start dt('toggleswitch.slide.duration'),
            box-shadow dt('toggleswitch.slide.duration');
    }

    .p-toggleswitch.p-toggleswitch-checked .p-toggleswitch-slider {
        background: dt('toggleswitch.checked.background');
        border-color: dt('toggleswitch.checked.border.color');
    }

    .p-toggleswitch.p-toggleswitch-checked .p-toggleswitch-handle {
        background: dt('toggleswitch.handle.checked.background');
        color: dt('toggleswitch.handle.checked.color');
        inset-inline-start: calc(dt('toggleswitch.width') - calc(dt('toggleswitch.handle.size') + dt('toggleswitch.gap')));
    }

    .p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover) .p-toggleswitch-slider {
        background: dt('toggleswitch.hover.background');
        border-color: dt('toggleswitch.hover.border.color');
    }

    .p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover) .p-toggleswitch-handle {
        background: dt('toggleswitch.handle.hover.background');
        color: dt('toggleswitch.handle.hover.color');
    }

    .p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover).p-toggleswitch-checked .p-toggleswitch-slider {
        background: dt('toggleswitch.checked.hover.background');
        border-color: dt('toggleswitch.checked.hover.border.color');
    }

    .p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:hover).p-toggleswitch-checked .p-toggleswitch-handle {
        background: dt('toggleswitch.handle.checked.hover.background');
        color: dt('toggleswitch.handle.checked.hover.color');
    }

    .p-toggleswitch:not(.p-disabled):has(.p-toggleswitch-input:focus-visible) .p-toggleswitch-slider {
        box-shadow: dt('toggleswitch.focus.ring.shadow');
        outline: dt('toggleswitch.focus.ring.width') dt('toggleswitch.focus.ring.style') dt('toggleswitch.focus.ring.color');
        outline-offset: dt('toggleswitch.focus.ring.offset');
    }

    .p-toggleswitch.p-invalid > .p-toggleswitch-slider {
        border-color: dt('toggleswitch.invalid.border.color');
    }

    .p-toggleswitch.p-disabled {
        opacity: 1;
    }

    .p-toggleswitch.p-disabled .p-toggleswitch-slider {
        background: dt('toggleswitch.disabled.background');
    }

    .p-toggleswitch.p-disabled .p-toggleswitch-handle {
        background: dt('toggleswitch.handle.disabled.background');
    }
`,classes:{root:function(e){var t=e.instance,n=e.props;return[`p-toggleswitch p-component`,{"p-toggleswitch-checked":t.checked,"p-disabled":n.disabled,"p-invalid":t.$invalid}]},input:`p-toggleswitch-input`,slider:`p-toggleswitch-slider`,handle:`p-toggleswitch-handle`},inlineStyles:{root:{position:`relative`}}}),w={name:`ToggleSwitch`,extends:{name:`BaseToggleSwitch`,extends:h,props:{trueValue:{type:null,default:!0},falseValue:{type:null,default:!1},readonly:{type:Boolean,default:!1},tabindex:{type:Number,default:null},inputId:{type:String,default:null},inputClass:{type:[String,Object],default:null},inputStyle:{type:Object,default:null},ariaLabelledby:{type:String,default:null},ariaLabel:{type:String,default:null}},style:C,provide:function(){return{$pcToggleSwitch:this,$parentInstance:this}}},inheritAttrs:!1,emits:[`change`,`focus`,`blur`],methods:{getPTOptions:function(e){return(e===`root`?this.ptmi:this.ptm)(e,{context:{checked:this.checked,disabled:this.disabled}})},onChange:function(e){if(!this.disabled&&!this.readonly){var t=this.checked?this.falseValue:this.trueValue;this.writeValue(t,e),this.$emit(`change`,e)}},onFocus:function(e){this.$emit(`focus`,e)},onBlur:function(e){var t,n;this.$emit(`blur`,e),(t=(n=this.formField).onBlur)==null||t.call(n,e)}},computed:{checked:function(){return this.d_value===this.trueValue},dataP:function(){return _({checked:this.checked,disabled:this.disabled,invalid:this.$invalid})}}},T=[`data-p-checked`,`data-p-disabled`,`data-p`],E=[`id`,`checked`,`tabindex`,`disabled`,`readonly`,`aria-checked`,`aria-labelledby`,`aria-label`,`aria-invalid`],D=[`data-p`],O=[`data-p`];function k(e,r,i,a,o,s){return x(),m(`div`,n({class:e.cx(`root`),style:e.sx(`root`)},s.getPTOptions(`root`),{"data-p-checked":s.checked,"data-p-disabled":e.disabled,"data-p":s.dataP}),[t(`input`,n({id:e.inputId,type:`checkbox`,role:`switch`,class:[e.cx(`input`),e.inputClass],style:e.inputStyle,checked:s.checked,tabindex:e.tabindex,disabled:e.disabled,readonly:e.readonly,"aria-checked":s.checked,"aria-labelledby":e.ariaLabelledby,"aria-label":e.ariaLabel,"aria-invalid":e.invalid||void 0,onFocus:r[0]||=function(){return s.onFocus&&s.onFocus.apply(s,arguments)},onBlur:r[1]||=function(){return s.onBlur&&s.onBlur.apply(s,arguments)},onChange:r[2]||=function(){return s.onChange&&s.onChange.apply(s,arguments)}},s.getPTOptions(`input`)),null,16,E),t(`div`,n({class:e.cx(`slider`)},s.getPTOptions(`slider`),{"data-p":s.dataP}),[t(`div`,n({class:e.cx(`handle`)},s.getPTOptions(`handle`),{"data-p":s.dataP}),[l(e.$slots,`handle`,{checked:s.checked})],16,O)],16,D)],16,T)}w.render=k;var A={name:`InputSwitch`,extends:w,mounted:function(){console.warn(`Deprecated since v4. Use ToggleSwitch component instead.`)}},j={key:0},M={class:`card`,style:{"max-width":`28rem`}},N={class:`flex justify-between mb-4`},P={class:`text-surface-900 font-medium`},F={class:`flex justify-between mb-4`},I={class:`text-surface-900 font-medium`},L={class:`flex justify-between mb-4`},R={class:`text-surface-900 font-medium`},z={class:`flex justify-between mb-4`},B=v(s({__name:`SettingsView`,setup(n){let i=p(),s=c(),l=u(``),{isDarkTheme:h,toggleDarkMode:_}=b();r(async()=>{let e=await fetch(`/api/version`);e.ok&&(l.value=await e.text())});function v(){i.logout(),s.push(`/login`)}return(n,r)=>d(i).isAdmin?(x(),m(`div`,j,[t(`div`,M,[t(`div`,N,[r[0]||=t(`span`,{class:`text-muted-color`},`Username:`,-1),t(`span`,P,y(d(i).username||`-`),1)]),t(`div`,F,[r[1]||=t(`span`,{class:`text-muted-color`},`Role:`,-1),t(`span`,I,y(d(i).isAdmin?`Admin`:`User`),1)]),t(`div`,L,[r[2]||=t(`span`,{class:`text-muted-color`},`Version:`,-1),t(`span`,R,y(l.value||`-`),1)]),r[4]||=t(`div`,{class:`flex justify-between mb-4`},[t(`span`,{class:`text-muted-color`},`About:`),t(`a`,{class:`settings-link`,href:`https://github.com/pvc-explorer-operator/pvc-explorer`,target:`_blank`,rel:`noopener`},`GitHub`)],-1),t(`div`,z,[r[3]||=t(`span`,{class:`text-muted-color`},`Dark Mode:`,-1),o(d(A),{modelValue:d(h),"onUpdate:modelValue":d(_)},null,8,[`modelValue`,`onUpdate:modelValue`])])]),o(d(f),{severity:`danger`,label:`Sign Out`,icon:`pi pi-sign-out`,rounded:``,onClick:v})])):(x(),e(d(S),{key:1,severity:`error`,closable:!1},{default:g(()=>[...r[5]||=[a(`Admin access required.`,-1)]]),_:1}))}}),[[`__scopeId`,`data-v-52fa3045`]]);export{B as default};