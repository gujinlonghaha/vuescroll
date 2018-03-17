/**
 * options unit-test-file
 */
import {
    trigger
}from '../../util'

describe('test ops', () => {
    let ins = null;
    let vs = null;
    let data = deepMerge(globalData, {});
    data.ops.vBar = void 0;
    data.ops.scrollPanel = {
        initialScrollX: '-1',
        initialScrollY: '-1',
        speed: 500
    }
    beforeAll(() => {
        ins = new Vue({
            template,
            data
        }).$mount();
        vs = ins.$refs['vsIns'];
        document.body.appendChild(ins.$el);
    })
    afterAll(() => {
        ins.$destroy();
        document.body.removeChild(ins.$el);
    })
    describe('test rail options', () => {
        it('test rail and bar pos', (done) => {
            ins.ops.vRail['pos'] = 'right';
            vs.forceUpdate();
            ins.$nextTick(() => {
                expect(vs.$refs['verticalRail'].$el.style.right).toBe('0px');
                expect(vs.$refs['verticalBar'].$el.style.right).toBe('0px');
                done();
            })
        });
    });

    describe('test scrollPanel options', () => {
        it('test initalScrollY and X\'s value < 0', (done) => {
            data.ops.scrollPanel['initialScrollY'] = 10;
            data.ops.scrollPanel['initialScrollX'] = '10%';
            ins.$destroy();
            document.body.removeChild(ins.$el);
            ins = new Vue({
                template,
                data
            }).$mount();
            vs = ins.$refs['vsIns'];
            document.body.appendChild(ins.$el);
            setTimeout(() => {
                const left = vs.$refs['scrollPanel'].$el.scrollLeft;
                const top = vs.$refs['scrollPanel'].$el.scrollTop;
                expect(top).toBe(10);
                expect(left).toBe(vs.$refs['scrollPanel'].$el.scrollWidth * 0.1);
                done();
            }, 700);
        });
    });
});