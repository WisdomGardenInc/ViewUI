// used for Modal & $Spin & Drawer
import { getScrollBarSize } from '../../utils/assist';
export default {
    props: {
        lockScroll: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        checkScrollBar () {
            let fullWindowWidth = window.innerWidth;
            if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
                const documentElementRect = document.documentElement.getBoundingClientRect();
                fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
            }
            this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
            if (this.bodyIsOverflowing) {
                this.scrollBarWidth = getScrollBarSize();
            }
        },
        checkMaskInVisible () {
            let ivuMasks = document.getElementsByClassName('ivu-modal-mask') || [];
            let extraMasks = document.getElementsByClassName('reveal-modal-bg') || [];
            let masks = Array.from(ivuMasks).concat(Array.from(extraMasks));

            return Array.from(masks).every(m => m.style.display === 'none' || m.classList.contains('fade-leave-to'));
        },
        setScrollBar () {
            if (this.bodyIsOverflowing && this.scrollBarWidth !== undefined) {
                document.body.style.paddingRight = `${this.scrollBarWidth}px`;
            }
        },
        resetScrollBar () {
            document.body.style.paddingRight = '';
        },
        addScrollEffect () {
            if (!this.lockScroll) return;
            this.checkScrollBar();
            this.setScrollBar();
            document.body.style.overflow = 'hidden';
        },
        removeScrollEffect() {
            if (!this.lockScroll) return;
            if (this.checkMaskInVisible()) {
                document.body.style.overflow = '';
                this.resetScrollBar();
            }
        }
    }
};
