import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
export const useAppStore = defineStore('appStore', {
    state() {
        return {
            mode: <'leads' | 'companies' | 'contacts' | 'none'>('companies'),
            buttonState: <'active'| 'loading'|'inactive'>('inactive'),
            instances: <number[]>([])
        }
    },
    getters: {
        getBtnState: (state) => {
            return state.buttonState;
        }
    },
    actions: {
        async create() {
            if (this.buttonState == 'inactive' || this.buttonState == 'loading' || this.mode == 'none') {
                return;
            }

            this.buttonState = 'loading';

            let url = '';
            if(this.mode == 'leads') {
                url = 'createlead';
            } else if(this.mode == 'contacts') {
                url = 'createcontact';
            } else {
                url = 'createcompany';
            }
            //
            // await axios.get('http://localhost:3000/createlead');
            await axios.post(`http://localhost:3000/${url}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => {
                this.instances.push(res.data.id);
                this.buttonState = 'active';
            });
        }
    }
})
