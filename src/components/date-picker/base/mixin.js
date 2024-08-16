
import {mergeHours} from '../util';

export default {
    name: 'PanelTable',
    props: {
        tableDate: {
            type: Date,
            required: true
        },
        disabledDate: {
            type: Function
        },
        selectionMode: {
            type: String,
            required: true
        },
        value: {
            type: Array,
            required: true
        },
        rangeState: {
            type: Object,
            default: () => ({
                from: null,
                to: null,
                selecting: false
            })
        },
        focusedDate: {
            type: Date,
            required: true,
        }
    },
    computed: {
        dates(){
            const {selectionMode, value, rangeState} = this;
            const rangeSelecting = selectionMode === 'range' && rangeState.selecting;
            return rangeSelecting ? [rangeState.from] : value;
        },
    },
    methods: {
        handleClick (cell, e) {
            e.stopPropagation();

            if (cell.disabled || cell.type === 'weekLabel') return;
            let newDate;

            if (this.selectionMode === 'range') {
                newDate = new Date(mergeHours(cell.date, this.rangeState.selecting ? this.value[1] : this.value[0]));
            } else {
                newDate = new Date(mergeHours(cell.date, this.value[0]));
            }

            this.$emit('on-pick', newDate);
            this.$emit('on-pick-click');
        },
        handleMouseMove (cell) {
            if (!this.rangeState.selecting) return;
            if (cell.disabled) return;
            const newDate = cell.date;
            this.$emit('on-change-range', newDate);
        },
    }
};
