<template>
    <!-- @params  -->
    <!-- @params btn  -->
    <!-- @params okBtn -->
    <!-- @params cancelBtn -->
    <!-- slot 与 msg 只取其一， 优先msg传值 -->
    <div class="dialog">
        <div class="mask"></div>
        <div class="content">
            <div class="_content">
                <i class="closeBtn" @click="closeFn" v-if="closeBtn"></i>
                <form id='dialogFrom' v-html="msg" v-if="msg">

                </form>
                <form id='dialogFrom' v-if="!msg">
                    <slot name="dialogHtml"></slot>
                </form>
            </div>
            <div class="disFlex" v-if="btn !== 'false' && (okBtn !== 'false' || cancelBtn !== 'false')">
                <button class="cancel flexItem" @click="cancelFn" v-if="cancelBtn !== 'false'">{{cancelBtn || '取消'}}</button>
                <button class="sure flexItem" @click="sureFn" v-if="okBtn !== 'false'">{{okBtn || '确认'}}</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: [
        'msg',
        'btn',
        'okBtn',
        'cancelBtn',
        'closeBtn'
    ],
    mounted() {
        if (this.btn == 'false' || (this.okBtn == 'false' && this.cancelBtn == 'false')) {
            setTimeout(() => {
                this.cancelFn()
            }, 2000)
        }
    },
    methods: {
        sureFn() {
            let _input = document.getElementById('dialogFrom').querySelectorAll('input');
            let obj = {};
            for (let i = 0; i < _input.length; i++) {
                obj[_input[i].getAttribute('name')] = _input[i].value;
            }
            this.$emit('sure', obj);
        },
        cancelFn() {
            this.$emit('cancel')
        },
        closeFn(){
            this.$emit('close')
        }
    }
}
</script>

<style scoped lang="scss">
.dialog {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 999;
    -webkit-animation-name: fadeIn;
    -webkit-animation-duration: 4s;
    .mask {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, .2);
        z-index: 9;
    }
    .content {
        position: absolute;
        width: 80%;
        background: #fff;
        border-radius: .25rem;
        margin-left: -40%;
        left: 50%;
        top: 50%;
        transform: translateY(-50%);
        z-index: 99;
        ._content {
            padding: 1.2rem;
            line-height: 1.2rem;
            font-size: .8rem;
        }
        .closeBtn{
            position: absolute;
            color: #999;
            font-size: 1.2rem;
            width: 1.5rem;
            height: 2rem;
            background: url(../../../assets/image/icon/close.png) no-repeat center center;
            background-size: 40%;
            top: 0;
            right: 0;
        }
        .disFlex {
            border-radius: 0 0 .25rem .25rem;
            overflow: hidden;
            button {
                width: 50%;
                line-height: 2rem;
                font-size: .8rem;
                &.cancel {
                    background: #e7e7e7;
                    color: #333;
                }
                &.sure {
                    background: #11abcf;
                    color: #fff;
                }
            }
        }
    }
}
</style>