(this["webpackJsonpmega-event"]=this["webpackJsonpmega-event"]||[]).push([[0],{17:function(e,t,s){e.exports={header:"App_header__2OAUK",h1:"App_h1__3T8ui",h2:"App_h2__2Ch3K"}},18:function(e,t,s){e.exports={selectBlock:"select_selectBlock__Rdq7x",inputBlock:"select_inputBlock__2yhBY",inputBlockDisabled:"select_inputBlockDisabled__ztktY",img:"select_img__tP4gG",input:"select_input__2f76q",inputDisabled:"select_inputDisabled__2CGhk",text:"select_text__387ij",date:"select_date__1Wubl"}},19:function(e,t,s){e.exports={container:"finalPage_container__1IwQt",result:"finalPage_result__1AOI7",item:"finalPage_item__3Hfua",label:"finalPage_label__3GeUh",value:"finalPage_value__3W4qh",option:"finalPage_option__29sK-"}},22:function(e,t,s){e.exports={container:"checkbox_container__2yqrr",disabledContainer:"checkbox_disabledContainer__2N9t0",img:"checkbox_img__38JP1",text:"checkbox_text__2knDP",textDisabled:"checkbox_textDisabled__fc1pY"}},24:function(e,t,s){e.exports={form:"authorization_form__MOH7x",email:"authorization_email__1fjG1",inputBlock:"authorization_inputBlock__U97QR",serverError:"authorization_serverError__2D8ba"}},46:function(e,t,s){e.exports={button:"button_button__2a1t0"}},47:function(e,t,s){e.exports={lds_roller:"preloader_lds_roller__3UVO6"}},49:function(e,t,s){e.exports={blockError:"error500_blockError__2SUk1"}},5:function(e,t,s){e.exports={inputBlock:"input_inputBlock__27n4n",input:"input_input__1FeEU",inputDisabled:"input_inputDisabled__3Aid7",inputField:"input_inputField__3I74k",inputModified:"input_inputModified__1Q_n5",label:"input_label__12ihR",selected:"input_selected__uJhpz",error:"input_error__1wjzr",eye:"input_eye__1lFpl"}},6:function(e,t,s){e.exports={container:"questionary_container__1nEN_",input:"questionary_input__1nhx2",switch:"questionary_switch__MlDaW",switchDisabled:"questionary_switchDisabled__2stCH",switchButton:"questionary_switchButton__267O4",selected:"questionary_selected__3Vm2n",questionary:"questionary_questionary__3Tbkc",personalDataLeft:"questionary_personalDataLeft__1Pb1k",dividerLeft:"questionary_dividerLeft__12nQi",dividerRight:"questionary_dividerRight__Q-Nz3",personalDataRight:"questionary_personalDataRight__3uc5e",checkboxBlock:"questionary_checkboxBlock__1mDog",select:"questionary_select__3-gwl"}},78:function(e,t,s){},79:function(e,t,s){"use strict";s.r(t);var a=s(1),i=s.n(a),n=s(25),c=s.n(n),r=s(28),o=s(13),l=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,80)).then((function(t){var s=t.getCLS,a=t.getFID,i=t.getFCP,n=t.getLCP,c=t.getTTFB;s(e),a(e),i(e),n(e),c(e)}))},u=s(21),d=s(45),p=s(27),h=s(2),b=s(29),j=s.n(b),O={auth:function(e,t){return j()({method:"post",url:"http://pink-code.ru:20085/auth",headers:{"Content-Type":"application/json"},data:{username:e,password:t}}).then((function(e){return e})).catch((function(e){return e.response}))},getList:function(e){return j()({method:"get",url:"http://pink-code.ru:20085/list",headers:{Authorization:"Bearer ".concat(e)}}).then((function(e){return e})).catch((function(e){return e.response}))},postForm:function(e,t){return j()({method:"post",url:"http://pink-code.ru:20085/request",headers:{Authorization:"Bearer ".concat(e),"Content-Type":"application/json"},data:t}).then((function(e){return e})).catch((function(e){return e.response}))}},v="SET_AUTH",m="SET_TOKEN",f="SERVER_IN_PROGRESS",_="SET_EVENTS_DATE",x="SELECT_DATE_ITEM",k="SET_COMPLETED_FORM",g="SET_COMPLETE",y="SET_SERVER_ERROR_MESSAGE",C="SET_ERROR_500",D="SET_LIST_STATUS",S={isAuth:!1,token:"",isServerProgress:!1,eventsDate:[],completedForm:{checkbox:[],inputs:[],switch:!0},isComplete:!1,serverErrorMessage:"",isError500:!1,isListComplete:!1},N=function(e){return{type:v,isAuth:e}},E=function(e){return{type:m,token:e}},w=function(e){return{type:f,isServerProgress:e}},F=function(e){return{type:g,isComplete:e}},V=function(e){return{type:y,serverErrorMessage:e}},B=function(e){return{type:C,isError500:e}},T=function(e){return{type:D,isListComplete:e}},A=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:S,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case v:return Object(h.a)(Object(h.a)({},e),{},{isAuth:t.isAuth});case m:return Object(h.a)(Object(h.a)({},e),{},{token:t.token});case f:return Object(h.a)(Object(h.a)({},e),{},{isServerProgress:t.isServerProgress});case _:return Object(h.a)(Object(h.a)({},e),{},{eventsDate:t.eventsDate.map((function(e){return Object(h.a)(Object(h.a)({},e),{},{isSelected:!1})}))});case x:return Object(h.a)(Object(h.a)({},e),{},{eventsDate:e.eventsDate.map((function(e){return e.id===Number(t.id)?Object(h.a)(Object(h.a)({},e),{},{isSelected:!0}):Object(h.a)(Object(h.a)({},e),{},{isSelected:!1})}))});case k:return Object(h.a)(Object(h.a)({},e),{},{completedForm:t.completedForm});case g:return Object(h.a)(Object(h.a)({},e),{},{isComplete:t.isComplete});case y:return Object(h.a)(Object(h.a)({},e),{},{serverErrorMessage:t.serverErrorMessage});case C:return Object(h.a)(Object(h.a)({},e),{},{isError500:t.isError500});case D:return Object(h.a)(Object(h.a)({},e),{},{isListComplete:t.isListComplete});default:return e}},P=Object(u.c)({reducer:A}),M=Object(u.d)(P,Object(u.a)(d.a));window.store=M;var R=M,q=s(3),L=s(17),I=s.n(L),U=s(11),z=s(12),G=s(15),Q=s(14),H=s(5),J=s.n(H),K=s.p+"static/media/eyeOpenDisabled.7317f907.svg",W=s.p+"static/media/eyeOpenActive.5189878d.svg",Y=s.p+"static/media/eyeClosed.0e32c567.svg",X=s(0),Z=function(e){Object(G.a)(s,e);var t=Object(Q.a)(s);function s(){var e;Object(U.a)(this,s);for(var a=arguments.length,i=new Array(a),n=0;n<a;n++)i[n]=arguments[n];return(e=t.call.apply(t,[this].concat(i))).state={isFocused:!1,isTouched:!1,error:"",isPasswordVisible:!1},e.checkValidate=function(){var t=e.props.validate.map((function(t){return t(e.props.value)})).find((function(e){return e}));e.setState({error:t}),e.props.setValidate(e.props.id,!t)},e.onFocus=function(t){e.setState({isFocused:!0,isTouched:!0})},e.onBlur=function(){e.setState({isFocused:!1})},e.onMouseDownEye=function(){e.setState({isPasswordVisible:!0})},e.onMouseUpEye=function(){e.setState({isPasswordVisible:!1}),e.ref.focus()},e.onChangeEye=function(){return e.state.isFocused||e.state.isPasswordVisible?e.state.isFocused&&!e.state.isPasswordVisible?Y:W:K},e}return Object(z.a)(s,[{key:"componentDidUpdate",value:function(e,t){e.value===this.props.value&&t.isFocused===this.state.isFocused||!this.props.validate||this.checkValidate()}},{key:"render",value:function(){var e=this;return Object(X.jsxs)("div",{className:J.a.inputBlock,children:[Object(X.jsxs)("div",{className:"".concat(J.a.input," ").concat(this.state.isFocused&&!this.props.disabled&&J.a.selected," ").concat(this.props.disabled&&J.a.inputDisabled),children:[(this.props.value||this.state.isFocused)&&Object(X.jsx)("label",{className:J.a.label,children:this.props.placeholder}),Object(X.jsx)("input",{disabled:this.props.disabled,className:J.a.inputField+" "+((this.props.value||this.state.isFocused)&&J.a.inputModified)||"",id:this.props.id,value:this.props.value,onChange:this.props.onChange,onFocus:this.onFocus,onBlur:this.onBlur,placeholder:this.props.placeholder,type:"password"===this.props.type&&this.state.isPasswordVisible?"text":this.props.type,ref:function(t){return e.ref=t}}),"password"===this.props.type&&Object(X.jsx)("img",{onMouseDown:this.onMouseDownEye,onMouseUp:this.onMouseUpEye,className:J.a.eye,src:this.onChangeEye(),alt:""})]}),this.state.isTouched&&!this.state.isFocused&&this.state.error&&Object(X.jsx)("div",{className:J.a.error,children:this.state.error})]})}}]),s}(i.a.Component),$=s(46),ee=s.n($),te=function(e){return Object(X.jsx)("button",{onClick:e.onClick,disabled:e.disabled,className:"".concat(ee.a.button," ").concat(e.className),children:e.children})},se=function(e){if(!e)return"\u041f\u043e\u043b\u0435 \u043e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e \u0434\u043b\u044f \u0437\u0430\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u044f"},ae=function(e){if(!/\S+@\S+\.\S+/.test(e))return"\u041d\u0435\u0432\u0435\u0440\u043d\u044b\u0439 Email"},ie=s(24),ne=s.n(ie),ce=function(e){Object(G.a)(s,e);var t=Object(Q.a)(s);function s(e){var a;return Object(U.a)(this,s),(a=t.call(this,e)).state={inputs:[{id:0,value:"",placeholder:"E-mail",type:"text",validate:[se,ae],isValidate:!0},{id:1,value:"",placeholder:"\u041f\u0430\u0440\u043e\u043b\u044c",type:"password",validate:[se],isValidate:!0}]},a.setValidate=function(e,t){a.setState(Object(h.a)(Object(h.a)({},a.state),{},{inputs:a.state.inputs.map((function(s){return s.id===Number(e)?Object(h.a)(Object(h.a)({},s),{},{isValidate:t}):s}))}))},a.onChange=function(e){var t=e.currentTarget.id,s=e.currentTarget.value;a.props.setServerErrorMessage(""),a.setState(Object(h.a)(Object(h.a)({},a.state),{},{inputs:a.state.inputs.map((function(e){return e.id===Number(t)?Object(h.a)(Object(h.a)({},e),{},{value:s}):e}))}))},a.onClick=function(){var e=a.state.inputs[0].value,t=a.state.inputs[1].value;a.props.login(e,t)},a.isDisabledButton=function(){return!a.state.inputs.every((function(e){return!0===e.isValidate}))||a.props.isServerProgress},a.isDisabledInput=function(){return a.props.isServerProgress},a.wrapper=i.a.createRef(),a}return Object(z.a)(s,[{key:"componentDidMount",value:function(){this.setState(Object(h.a)(Object(h.a)({},this.state),{},{inputs:this.state.inputs.map((function(e){return 0===e.id?Object(h.a)(Object(h.a)({},e),{},{value:"user@example.com"}):Object(h.a)(Object(h.a)({},e),{},{value:"user8952"})}))}))}},{key:"render",value:function(){return Object(X.jsxs)("div",{children:[this.props.isAuth&&Object(X.jsx)(q.a,{to:"/questionary"}),Object(X.jsx)("h1",{className:I.a.h1,children:"\u0414\u043e\u0431\u0440\u043e \u043f\u043e\u0436\u0430\u043b\u043e\u0432\u0430\u0442\u044c"}),Object(X.jsxs)("div",{className:ne.a.form,children:[Object(X.jsxs)("div",{className:ne.a.inputBlock,children:[Object(X.jsx)("div",{className:ne.a.email,children:Object(X.jsx)(Z,Object(h.a)(Object(h.a)({disabled:this.isDisabledInput()},this.state.inputs[0]),{},{onChange:this.onChange,setValidate:this.setValidate}),this.state.inputs[0].id)}),Object(X.jsxs)("div",{children:[Object(X.jsx)(Z,Object(h.a)(Object(h.a)({disabled:this.isDisabledInput()},this.state.inputs[1]),{},{onChange:this.onChange,setValidate:this.setValidate}),this.state.inputs[1].id),Object(X.jsx)("div",{className:ne.a.serverError,children:this.props.serverErrorMessage})]})]}),Object(X.jsx)(te,{onClick:this.onClick,disabled:this.isDisabledButton(),children:"\u0412\u043e\u0439\u0442\u0438"})]})]})}}]),s}(i.a.Component),re=Object(o.b)((function(e){return{isAuth:e.reducer.isAuth,isServerProgress:e.reducer.isServerProgress,serverErrorMessage:e.reducer.serverErrorMessage,isListComplete:e.reducer.isListComplete}}),{login:function(e,t){return function(s){s(V("")),s(w(!0)),O.auth(e,t).then((function(e){switch(e.status){case 200:s(E(e.data.token)),s(N(!0));break;case 400:s(V("\u041d\u0435\u0432\u0435\u0440\u043d\u044b\u0439 email \u0438\u043b\u0438 \u043f\u0430\u0440\u043e\u043b\u044c"));break;case 500:s(V("\u041e\u0448\u0438\u0431\u043a\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430"));break;default:s(V("\u041d\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043d\u0430\u044f \u043e\u0448\u0438\u0431\u043a\u0430"))}s(w(!1))}))}},setServerErrorMessage:V})(ce),oe=s(22),le=s.n(oe),ue=s.p+"static/media/checkboxOn.329474b4.svg",de=s.p+"static/media/checkboxOff.600b40e8.svg",pe=function(e){return Object(X.jsxs)("div",{id:e.id,onClick:e.onClick,className:"".concat(le.a.container," ").concat(e.disabled?le.a.disabledContainer:""),children:[Object(X.jsx)("img",{className:le.a.img,src:e.checked?ue:de,alt:""}),Object(X.jsx)("div",{className:"".concat(le.a.text," ").concat(e.disabled?le.a.textDisabled:""),children:e.text})]})},he=s(18),be=s.n(he),je=s.p+"static/media/arrowDropDown.a23ac2ef.svg",Oe=s.p+"static/media/arrowDropUp.bf081132.svg",ve=function(e){Object(G.a)(s,e);var t=Object(Q.a)(s);function s(){var e;Object(U.a)(this,s);for(var a=arguments.length,i=new Array(a),n=0;n<a;n++)i[n]=arguments[n];return(e=t.call.apply(t,[this].concat(i))).state={isOpen:!1},e.onClickMain=function(){e.setState({isOpen:!e.state.isOpen})},e.isSelected=function(){var t=e.props.eventsDate.find((function(e){return!0===e.isSelected}));return t?t.label:"\u0414\u0435\u043d\u044c \u043c\u0435\u0440\u043e\u043f\u0440\u0438\u044f\u0442\u0438\u044f"},e}return Object(z.a)(s,[{key:"render",value:function(){var e=this,t=function(t){return Object(X.jsx)("div",{className:be.a.input,children:Object(X.jsx)("div",{data:t.data,onClick:function(){e.setState({isOpen:!1}),t.selectDate(t.data.id)},className:"".concat(be.a.date),children:t.data.label})})};return Object(X.jsxs)("div",{className:be.a.selectBlock,children:[Object(X.jsx)("div",{onClick:this.onClickMain,className:"".concat(be.a.inputBlock," ").concat(this.props.disabled?be.a.inputBlockDisabled:""),children:Object(X.jsxs)("div",{className:"".concat(be.a.input," ").concat(this.props.disabled?be.a.inputDisabled:""),children:[Object(X.jsx)("div",{className:be.a.text,children:this.isSelected()}),Object(X.jsx)("img",{className:be.a.img,src:this.state.isOpen?Oe:je,alt:""})]})}),this.state.isOpen&&Object(X.jsx)("div",{className:be.a.inputBlock,children:this.props.eventsDate.map((function(s){return Object(X.jsx)(t,{data:s,selectDate:e.props.selectDate},s.id)}))})]})}}]),s}(i.a.Component),me=s(6),fe=s.n(me),_e=s(47),xe=s.n(_e),ke=function(e){return Object(X.jsxs)("div",{className:xe.a.lds_roller,children:[Object(X.jsx)("div",{}),Object(X.jsx)("div",{}),Object(X.jsx)("div",{}),Object(X.jsx)("div",{}),Object(X.jsx)("div",{}),Object(X.jsx)("div",{}),Object(X.jsx)("div",{}),Object(X.jsx)("div",{})]})},ge=s(48),ye=s.n(ge),Ce=function(e){Object(G.a)(s,e);var t=Object(Q.a)(s);function s(){var e;Object(U.a)(this,s);for(var a=arguments.length,i=new Array(a),n=0;n<a;n++)i[n]=arguments[n];return(e=t.call.apply(t,[this].concat(i))).state={isFocused:!1,isTouched:!1,error:""},e.checkValidate=function(){var t=e.props.validate.map((function(t){return t(e.props.value)})).find((function(e){return e}));e.setState({error:t}),e.props.setValidate(e.props.id,!t)},e.onFocus=function(t){e.setState({isFocused:!0,isTouched:!0})},e.onBlur=function(){e.setState({isFocused:!1})},e}return Object(z.a)(s,[{key:"componentDidUpdate",value:function(e,t){e.value===this.props.value&&t.isFocused===this.state.isFocused||!this.props.validate||this.checkValidate()}},{key:"render",value:function(){return Object(X.jsxs)("div",{className:J.a.inputBlock,children:[Object(X.jsxs)("div",{className:"".concat(J.a.input," ").concat(this.state.isFocused&&!this.props.disabled&&J.a.selected," ").concat(this.props.disabled&&J.a.inputDisabled),children:[(this.props.value||this.state.isFocused)&&Object(X.jsx)("label",{className:J.a.label,children:this.props.placeholder}),Object(X.jsx)(ye.a,{mask:this.props.mask,showMask:!1,placeholderChar:"\u2000",disabled:this.props.disabled,className:J.a.inputField+" "+((this.props.value||this.state.isFocused)&&J.a.inputModified)||"",id:this.props.id,value:this.props.value,onChange:this.props.onChange,onFocus:this.onFocus,onBlur:this.onBlur,placeholder:this.props.placeholder,type:this.props.type})]}),this.state.isTouched&&!this.state.isFocused&&this.state.error&&Object(X.jsx)("div",{className:J.a.error,children:this.state.error})]})}}]),s}(i.a.Component),De=function(e){Object(G.a)(s,e);var t=Object(Q.a)(s);function s(){var e;Object(U.a)(this,s);for(var a=arguments.length,i=new Array(a),n=0;n<a;n++)i[n]=arguments[n];return(e=t.call.apply(t,[this].concat(i))).state={checkbox:[{id:0,text:"\u041d\u0443\u0436\u043d\u0430 \u043f\u0430\u0440\u043a\u043e\u0432\u043a\u0430",checked:!1},{id:1,text:"\u0425\u043e\u0447\u0443 \u043f\u043e\u043b\u0443\u0447\u0438\u0442\u044c \u0440\u0430\u0437\u0434\u0430\u0442\u043e\u0447\u043d\u044b\u0439 \u043c\u0430\u0442\u0435\u0440\u0438\u0430\u043b",checked:!1},{id:2,text:"\u041d\u0443\u0436\u043d\u0430 \u043f\u043e\u043c\u043e\u0449\u044c \u0441\u043e\u043f\u0440\u043e\u0432\u043e\u0436\u0434\u0430\u044e\u0449\u0435\u0433\u043e",checked:!1}],inputs:[{id:0,value:"",placeholder:"\u0424\u0418\u041e",type:"text",validate:[se],isValidate:!1},{id:1,value:"",placeholder:"\u0414\u0430\u0442\u0430 \u0420\u043e\u0436\u0434\u0435\u043d\u0438\u044f",type:"text",validate:[se],isValidate:!1},{id:2,value:"",placeholder:"\u041d\u043e\u043c\u0435\u0440 \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0430",type:"text",validate:[se],isValidate:!1},{id:3,value:"",placeholder:"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u0438",type:"text",validate:[se],isValidate:!1},{id:4,value:"",placeholder:"\u0412\u0430\u0448\u0430 \u0434\u043e\u043b\u0436\u043d\u043e\u0441\u0442\u044c",type:"text",validate:[se],isValidate:!1},{id:5,value:"",placeholder:"\u041d\u043e\u043c\u0435\u0440 \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0430",type:"text",validate:[se],isValidate:!1}],switch:!0},e.setValidate=function(t,s){e.setState(Object(h.a)(Object(h.a)({},e.state),{},{inputs:e.state.inputs.map((function(e){return e.id===Number(t)?Object(h.a)(Object(h.a)({},e),{},{isValidate:s}):e}))}))},e.onChange=function(t){var s=t.currentTarget.id,a=t.currentTarget.value;e.setState(Object(h.a)(Object(h.a)({},e.state),{},{inputs:e.state.inputs.map((function(e){return e.id===Number(s)?Object(h.a)(Object(h.a)({},e),{},{value:a.slice(0,e.maxLength)}):e}))}))},e.onChecked=function(t){var s=t.currentTarget.id;e.setState(Object(h.a)(Object(h.a)({},e.state),{},{checkbox:e.state.checkbox.map((function(e){return e.id===Number(s)?Object(h.a)(Object(h.a)({},e),{},{checked:!e.checked}):e}))}))},e.onSwitch=function(){e.setState(Object(h.a)(Object(h.a)({},e.state),{},{switch:!e.state.switch}))},e.isDisabledInput=function(){return e.props.isServerProgress},e.isDisabledButton=function(){var t=e.state.inputs;return e.props.isServerProgress||(e.props.eventsDate.some((function(e){return!0===e.isSelected}))&&e.state.switch?!t.slice(0,3).every((function(e){return!0===e.isValidate})):!t.slice(5).every((function(e){return!0===e.isValidate})))},e.onSend=function(){e.props.sendResultForm(e.state)},e}return Object(z.a)(s,[{key:"componentDidMount",value:function(){this.props.isAuth&&this.setState(Object(h.a)(Object(h.a)({},this.state),{},{eventsDate:this.props.getListEventsDate()}))}},{key:"render",value:function(){var e=this;return Object(X.jsxs)("div",{className:fe.a.container,children:[!this.props.isAuth&&Object(X.jsx)(q.a,{to:"/login"}),this.props.isError500&&Object(X.jsx)(q.a,{to:"/error"}),this.props.isListComplete?Object(X.jsxs)("div",{children:[Object(X.jsx)("h1",{className:I.a.h1,children:"\u0417\u0430\u043f\u043e\u043b\u043d\u0438\u0442\u0435 \u0430\u043d\u043a\u0435\u0442\u0443 \u0443\u0447\u0430\u0441\u0442\u043d\u0438\u043a\u0430"}),Object(X.jsxs)("div",{className:"".concat(fe.a.switch," ").concat(this.props.isServerProgress?fe.a.switchDisabled:""),children:[Object(X.jsx)(te,{onClick:this.onSwitch,className:fe.a.switchButton,disabled:this.state.switch,children:"\u0424\u0438\u0437. \u043b\u0438\u0446\u043e"}),Object(X.jsx)(te,{onClick:this.onSwitch,className:fe.a.switchButton,disabled:!this.state.switch,children:"\u042e\u0440. \u043b\u0438\u0446\u043e"})]}),Object(X.jsxs)("div",{className:fe.a.questionary,children:[Object(X.jsx)("div",{className:fe.a.personalDataLeft,children:this.state.switch?Object(X.jsxs)("div",{children:[Object(X.jsx)("h2",{className:I.a.h2,children:"\u041b\u0438\u0447\u043d\u044b\u0435 \u0434\u0430\u043d\u043d\u044b\u0435"}),Object(X.jsx)("div",{className:fe.a.input,children:Object(X.jsx)(Z,Object(h.a)(Object(h.a)({},this.state.inputs[0]),{},{disabled:this.isDisabledInput(),onChange:this.onChange,setValidate:this.setValidate}))},this.state.inputs[0].id),Object(X.jsx)("div",{className:fe.a.input,children:Object(X.jsx)(Ce,Object(h.a)(Object(h.a)({mask:[/[0-3]/,/\d/,".",/[0-1]/,/\d/,".",/[1-2]/,/[09]/,/\d/,/\d/]},this.state.inputs[1]),{},{disabled:this.isDisabledInput(),onChange:this.onChange,setValidate:this.setValidate}))},this.state.inputs[1].id),Object(X.jsx)("div",{className:fe.a.input,children:Object(X.jsx)(Ce,Object(h.a)(Object(h.a)({mask:["+","7"," ","(",/[1-9]/,/\d/,/\d/,")"," ",/\d/,/\d/,/\d/,"-",/\d/,/\d/,"-",/\d/,/\d/]},this.state.inputs[2]),{},{disabled:this.isDisabledInput(),onChange:this.onChange,setValidate:this.setValidate}))},this.state.inputs[2].id)]}):Object(X.jsxs)("div",{children:[Object(X.jsx)("h2",{className:I.a.h2,children:"\u041b\u0438\u0447\u043d\u044b\u0435 \u0434\u0430\u043d\u043d\u044b\u0435"}),this.state.inputs.slice(3,5).map((function(t){return Object(X.jsx)("div",{className:fe.a.input,children:Object(X.jsx)(Z,Object(h.a)(Object(h.a)({},t),{},{disabled:e.isDisabledInput(),onChange:e.onChange,setValidate:e.setValidate}))},t.id)})),Object(X.jsx)("div",{className:fe.a.input,children:Object(X.jsx)(Ce,Object(h.a)(Object(h.a)({mask:["+","7"," ","(",/[1-9]/,/\d/,/\d/,")"," ",/\d/,/\d/,/\d/,"-",/\d/,/\d/,"-",/\d/,/\d/]},this.state.inputs[5]),{},{disabled:this.isDisabledInput(),onChange:this.onChange,setValidate:this.setValidate}))},this.state.inputs[5].id)]})}),Object(X.jsx)("div",{className:fe.a.dividerLeft}),Object(X.jsx)("div",{className:fe.a.dividerRight}),Object(X.jsx)("div",{className:fe.a.personalDataRight,children:Object(X.jsxs)("div",{children:[Object(X.jsx)("h2",{className:I.a.h2,children:"\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0430\u0442\u0443 \u043c\u0435\u0440\u043e\u043f\u0440\u0438\u044f\u0442\u0438\u044f"}),Object(X.jsx)("div",{className:fe.a.checkbox}),Object(X.jsx)("div",{className:fe.a.select,children:Object(X.jsx)(ve,{disabled:this.isDisabledInput(),eventsDate:this.props.eventsDate,selectDate:this.props.selectDateItem})}),Object(X.jsx)("div",{className:fe.a.checkboxBlock,children:this.state.checkbox.map((function(t){return Object(X.jsx)(pe,Object(h.a)(Object(h.a)({disabled:e.isDisabledInput()},t),{},{onClick:e.onChecked}),t.id)}))})]})})]}),Object(X.jsx)(te,{onClick:this.onSend,disabled:this.isDisabledButton(),children:"\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c \u0437\u0430\u044f\u0432\u043a\u0443"}),this.props.isComplete&&Object(X.jsx)(q.a,{to:"/result"})]}):Object(X.jsx)(ke,{})]})}}]),s}(i.a.Component),Se=Object(o.b)((function(e){return{isAuth:e.reducer.isAuth,eventsDate:e.reducer.eventsDate,isComplete:e.reducer.isComplete,isListComplete:e.reducer.isListComplete,isError500:e.reducer.isError500,isServerProgress:e.reducer.isServerProgress}}),{sendResultForm:function(e){return function(t){t(w(!0));var s=R.getState().reducer.eventsDate.find((function(e){return e.isSelected})),a=e.checkbox.map((function(e){return e.checked&&Object(p.a)({},"opt".concat(e.id+1),1)})).reduce((function(e,t){return Object.assign(e,t)})),i=e.switch?{name:e.inputs[0].value,dob:e.inputs[1].value,phone:e.inputs[2].value}:{cName:e.inputs[3].value,pos:e.inputs[4].value,phone:e.inputs[5].value},n=Object(h.a)(Object(h.a)({},i),{},{eventId:s.id},a);O.postForm(R.getState().reducer.token,n).then((function(s){switch(s.status){case 200:t(function(e){return{type:k,completedForm:e}}(e)),t(F(!0));break;case 401:t(V("\u041e\u0448\u0438\u0431\u043a\u0430 \u0430\u0432\u0442\u043e\u0440\u0438\u0437\u0430\u0446\u0438\u0438")),t(E("")),t(N(!1));break;case 500:t(B(!0));break;default:t(E("")),t(N(!1)),t(V("\u041d\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043d\u0430\u044f \u043e\u0448\u0438\u0431\u043a\u0430"))}t(F(!1)),t(w(!1))}))}},getListEventsDate:function(){return function(e){e(T(!1)),e(w(!0)),O.getList(R.getState().reducer.token).then((function(t){switch(t.status){case 200:e((s=t.data.eventsDate,{type:_,eventsDate:s})),e(T(!0));break;case 401:e(V("\u041e\u0448\u0438\u0431\u043a\u0430 \u0430\u0432\u0442\u043e\u0440\u0438\u0437\u0430\u0446\u0438\u0438")),e(E("")),e(N(!1));break;case 500:e(B(!0));break;default:e(E("")),e(N(!1)),e(V("\u041d\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043d\u0430\u044f \u043e\u0448\u0438\u0431\u043a\u0430"))}var s;e(w(!1))}))}},selectDateItem:function(e){return{type:x,id:e}}})(De),Ne=s(19),Ee=s.n(Ne),we=function(e){Object(G.a)(s,e);var t=Object(Q.a)(s);function s(){var e;Object(U.a)(this,s);for(var a=arguments.length,i=new Array(a),n=0;n<a;n++)i[n]=arguments[n];return(e=t.call.apply(t,[this].concat(i))).state={isRedirect:!1},e.onRedirect=function(){e.setState({isRedirect:!0})},e}return Object(z.a)(s,[{key:"render",value:function(){var e=this.props.completedForm,t=function(e){return Object(X.jsxs)("div",{className:Ee.a.item,children:[Object(X.jsx)("div",{className:Ee.a.label,children:e.label}),Object(X.jsx)("div",{className:Ee.a.value,children:e.value})]})};return Object(X.jsx)("div",{className:Ee.a.container,children:this.props.isAuth?Object(X.jsxs)("div",{children:[this.props.isError500&&Object(X.jsx)(q.a,{to:"/error"}),this.state.isRedirect&&Object(X.jsx)(q.a,{to:"/questionary"}),Object(X.jsx)("h1",{className:I.a.h1,children:"\u0421\u043f\u0430\u0441\u0438\u0431\u043e \u0437\u0430 \u0437\u0430\u044f\u0432\u043a\u0443!"}),Object(X.jsxs)("div",{className:Ee.a.result,children:[e.switch?Object(X.jsx)(t,{label:"\u0422\u0438\u043f \u0443\u0447\u0430\u0441\u0442\u043d\u0438\u043a\u0430",value:"\u0424\u0438\u0437. \u043b\u0438\u0446\u043e"}):Object(X.jsx)(t,{label:"\u0422\u0438\u043f \u0443\u0447\u0430\u0441\u0442\u043d\u0438\u043a\u0430",value:"\u042e\u0440. \u043b\u0438\u0446\u043e"}),e.switch?e.inputs.slice(0,3).map((function(e){return Object(X.jsx)(t,{label:e.placeholder,value:e.value},e.id)})):e.inputs.slice(3).map((function(e){return Object(X.jsx)(t,{label:e.placeholder,value:e.value},e.id)})),Object(X.jsx)("div",{className:Ee.a.label,children:"\u041e\u043f\u0446\u0438\u0438"}),e.checkbox.map((function(e){return e.checked&&Object(X.jsx)("div",{className:Ee.a.option,children:e.text},e.id)}))]}),Object(X.jsx)(te,{onClick:this.onRedirect,children:"\u0412\u0435\u0440\u043d\u0443\u0442\u044c\u0441\u044f \u043d\u0430 \u0433\u043b\u0430\u0432\u043d\u0443\u044e"})]}):Object(X.jsx)(q.a,{to:"/login"})})}}]),s}(i.a.Component),Fe=Object(o.b)((function(e){return{isAuth:e.reducer.isAuth,completedForm:e.reducer.completedForm}}),{})(we),Ve=s(49),Be=s.n(Ve),Te=Object(o.b)((function(e){return{isError500:e.reducer.isError500}}),{setError500:B})((function(e){return Object(X.jsxs)("div",{children:[!e.isError500&&Object(X.jsx)(q.a,{to:"/questionary"}),Object(X.jsx)("div",{className:Be.a.blockError,children:"\u041e\u0448\u0438\u0431\u043a\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430"}),Object(X.jsx)(te,{onClick:function(){e.setError500(!1)},children:"\u041f\u043e\u043f\u0440\u043e\u0431\u043e\u0432\u0430\u0442\u044c \u0435\u0449\u0451 \u0440\u0430\u0437"})]})})),Ae=Object(o.b)((function(e){return{isAuth:e.reducer.isAuth}}),{})((function(e){return Object(X.jsxs)(r.a,{children:[e.isAuth?Object(X.jsx)(q.a,{to:"questionary"}):Object(X.jsx)(q.a,{to:"/login"}),Object(X.jsxs)("div",{children:[Object(X.jsx)("header",{className:I.a.header,children:"Codding Mega Event"}),Object(X.jsx)(q.b,{exact:!0,path:"/login",component:re}),Object(X.jsx)(q.b,{exact:!0,path:"/questionary",component:Se}),Object(X.jsx)(q.b,{exact:!0,path:"/result",component:Fe}),Object(X.jsx)(q.b,{exact:!0,path:"/error",component:Te})]})]})}));s(78);c.a.render(Object(X.jsx)(i.a.StrictMode,{children:Object(X.jsx)(r.a,{children:Object(X.jsx)(o.a,{store:R,children:Object(X.jsx)(Ae,{})})})}),document.getElementById("root")),l()}},[[79,1,2]]]);
//# sourceMappingURL=main.c5af4dcc.chunk.js.map