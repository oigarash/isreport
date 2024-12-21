// ==UserScript==
// @name         Template Form Auto Filler
// @namespace    http://igajun.net
// @version      1.0
// @description  Automatically fill form based on templates
// @author       Your name
// @match        https://ivy.insource.co.jp/training-reports/report/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // デバッグ用のログ関数
    function log(message) {
        console.log(`[Form Filler] ${message}`);
    }

    log('Script started');

    // テンプレートの定義
    const templates = {
        "Impressive": {
            "student_mastery_option_id": "1", // 非常に高い
            "student_mastery_comment": "受講者全員が非常に積極的に参加し、理解度も高かったです。グループワークでは活発な議論が行われ、お互いの経験を共有しながら学びを深めることができました。",
            "student_aggressive_option_id": "1", // 非常に良い
            "student_state_option_id": ["1", "2", "3", "4", "8"], // 積極的、グループワーク良好、etc
            "student_state_comment": "特に優秀な受講者が多く、質問も的確で、理解度の高さが印象的でした。グループワークでは建設的な意見交換が行われ、実践的な応用力も見られました。",
            "student_recommend1": "上級マネジメント研修",
            "content_level_option_id": "2", // ちょうど良かった
            "content_plan_option_id": "1", // 課題と合致していた
            "work_volume_option_id": "2", // ちょうど良かった
            "work_mastery_option_id": "1", // 深まったと感じた
            "online_trouble_instructor_option_id": "1", // 問題なかった
            "online_trouble_student_option_id": "1", // 問題なかった
            "work_takein_comment": "基本的なテキストの内容に加えて、実際の業務で起こりうる具体的な事例を交えながら解説を行いました。また、受講者同士でベストプラクティスを共有するワークを取り入れ、実践的な学びの場を提供しました。",
            "student_special_state_comment": "受講者の理解度が非常に高く、実践的な質問も多かったため、より高度な内容の研修（上級マネジメント研修など）をご提案することで、さらなるスキルアップが期待できます。また、受講者間で活発な意見交換が行われていたことから、組織内での知識共有の仕組みづくりについてもご提案させていただければと思います。",
            "customer_followup_comment": "受講者の皆様は非常に意欲的で、研修内容への理解も深く、今後の実践に向けて前向きな姿勢が見られました。特にグループワークでの活発な意見交換から、組織全体でのスキル向上に対する意識の高さが感じられました。フォローアップとして、より実践的なワークショップ形式の研修や、リーダーシップ研修などの提案が効果的かと思われます。"
        },
        "Very Good": {
            "student_mastery_option_id": "2", // 高い
            "student_mastery_comment": "全体的に理解度は高く、グループワークでも積極的な参加が見られました。実践的な質問も多く、研修内容への関心の高さが感じられました。",
            "student_aggressive_option_id": "2", // 良い
            "student_state_option_id": ["2", "3", "7", "8", "10"], // グループワーク良好、etc
            "student_state_comment": "受講者は熱心に取り組み、特にグループワークでは活発な意見交換が行われました。理解度も高く、実践的な質問も多く出ていました。",
            "student_recommend1": "リーダーシップ研修",
            "content_level_option_id": "2",
            "content_plan_option_id": "1",
            "work_volume_option_id": "2",
            "work_mastery_option_id": "1",
            "online_trouble_instructor_option_id": "1",
            "online_trouble_student_option_id": "1",
            "work_takein_comment": "テキストの内容に加えて、業界特有の課題に関連した事例を用いたディスカッションを実施しました。また、受講者それぞれの経験を共有し合うペアワークを取り入れ、実践的な学びを深めました。",
            "student_special_state_comment": "受講者の皆様の意欲が高く、基礎的な内容は十分に理解されていました。次のステップとして、リーダーシップ研修やより実践的なワークショップ形式の研修をご提案させていただきたいと思います。また、今回の学びを実践に活かすためのフォローアップ研修についてもご検討いただければと思います。",
            "customer_followup_comment": "受講者の皆様は非常に意欲的で、研修内容への理解も深く、今後の実践に向けて前向きな姿勢が見られました。特にグループワークでの活発な意見交換から、組織全体でのスキル向上に対する意識の高さが感じられました。フォローアップとして、より実践的なワークショップ形式の研修や、リーダーシップ研修などの提案が効果的かと思われます。"
        },
        "Good": {
            "student_mastery_option_id": "3", // 普通
            "student_mastery_comment": "基本的な内容は理解できており、グループワークにも参加していました。さらなる実践を重ねることで、より深い理解につながると考えられます。",
            "student_aggressive_option_id": "3", // 普通
            "student_state_option_id": ["6", "7", "19", "20"], // メモを取る、頷きながら聞く、etc
            "student_state_comment": "真面目に受講され、メモを取りながら熱心に聞いている様子が見られました。グループワークでも協力的な姿勢が見られました。",
            "student_recommend1": "基礎スキル研修",
            "content_level_option_id": "2",
            "content_plan_option_id": "1",
            "work_volume_option_id": "2",
            "work_mastery_option_id": "1",
            "online_trouble_instructor_option_id": "1",
            "online_trouble_student_option_id": "1",
            "work_takein_comment": "テキストの基本的な内容に加えて、理解を深めるための簡単なロールプレイングを実施しました。また、具体的な業務シーンを想定したケーススタディを用いて、実践的な応用力を養うワークを取り入れました。",
            "student_special_state_comment": "基本的な内容は理解されていましたが、より実践的な応用力を身につけるため、フォローアップ研修や事例を用いたワークショップなどをご提案させていただきたいと思います。また、個別の課題に応じた少人数制の研修プログラムについてもご検討いただければと思います。",
            "customer_followup_comment": "受講者の皆様は基本的な内容を理解され、実践に向けた意欲も見られました。特に業務シーンを想定したケーススタディでは、具体的な課題意識を持って取り組まれていました。今後は、より実践的な応用力を養うためのフォローアップ研修や、個別の課題に焦点を当てた少人数制のワークショップなどが効果的かと考えられます。"
        }
    };

    // DOMの読み込みを待つ
    function waitForElement(selector) {
        log(`Waiting for element: ${selector}`);
        return new Promise(resolve => {
            if (document.querySelector(selector)) {
                log(`Element found immediately: ${selector}`);
                return resolve(document.querySelector(selector));
            }

            const observer = new MutationObserver(mutations => {
                if (document.querySelector(selector)) {
                    log(`Element found after waiting: ${selector}`);
                    observer.disconnect();
                    resolve(document.querySelector(selector));
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
            log(`Observer started for: ${selector}`);
        });
    }

    // フォームをリセット
    function resetForm() {
        log('Resetting form');
        
        // ラジオボタンをリセット
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.checked = false;
        });

        // テキスト入力とテキストエリアをリセット
        document.querySelectorAll('input[type="text"], textarea').forEach(element => {
            element.value = '';
        });

        // 複数選択をリセット
        const multiSelect = document.getElementById('student-state-option-id');
        if (multiSelect) {
            Array.from(multiSelect.options).forEach(option => {
                option.selected = false;
            });
        }

        log('Form reset completed');
    }

    // UIの作成と追加
    function createTemplateUI() {
        log('Creating UI elements');
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.top = '10px';
        container.style.right = '10px';
        container.style.backgroundColor = '#f0f0f0';
        container.style.padding = '10px';
        container.style.borderRadius = '5px';
        container.style.zIndex = '9999';

        const select = document.createElement('select');
        select.style.marginRight = '10px';
        
        const options = ['選択してください', 'Impressive', 'Very Good', 'Good'];
        options.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt;
            option.text = opt;
            select.appendChild(option);
        });

        // リセットボタンを追加
        const resetButton = document.createElement('button');
        resetButton.textContent = 'リセット';
        resetButton.style.padding = '5px 10px';

        container.appendChild(select);
        container.appendChild(resetButton);
        document.body.appendChild(container);
        log('UI elements created and added to page');

        // 選択変更時のイベントリスナー
        select.addEventListener('change', () => {
            const selectedTemplate = select.value;
            log(`Template selected: ${selectedTemplate}`);
            if (selectedTemplate !== '選択してください' && templates[selectedTemplate]) {
                fillForm(templates[selectedTemplate]);
            }
        });

        // リセットボタンのイベントリスナー
        resetButton.addEventListener('click', () => {
            resetForm();
            select.value = '選択してください';
        });

        return { select, resetButton };
    }

    // フォームの自動入力
    function fillForm(template) {
        log(`Filling form with template: ${JSON.stringify(template)}`);
        
        // ラジオボタンの設定
        for (const [key, value] of Object.entries(template)) {
            if (key === 'student_state_option_id') continue; // 複数選択は別処理

            const elements = document.getElementsByName(key);
            log(`Found ${elements.length} elements for ${key}`);
            
            elements.forEach(element => {
                if (element.type === 'radio' && element.value === value) {
                    element.checked = true;
                    log(`Set radio ${key} to ${value}`);
                } else if (element.type === 'text' || element.tagName === 'TEXTAREA') {
                    element.value = value;
                    log(`Set ${element.type || element.tagName} ${key} to ${value}`);
                }
            });
        }

        // 複数選択の設定
        const multiSelect = document.getElementById('student-state-option-id');
        if (multiSelect) {
            log('Found multi-select element');
            // 一旦すべての選択を解除
            Array.from(multiSelect.options).forEach(option => {
                option.selected = false;
            });

            // テンプレートで指定された項目を選択
            template.student_state_option_id.forEach(value => {
                const option = Array.from(multiSelect.options).find(opt => opt.value === value);
                if (option) {
                    option.selected = true;
                    log(`Selected option ${value} in multi-select`);
                } else {
                    log(`Option ${value} not found in multi-select`);
                }
            });
        } else {
            log('Multi-select element not found');
        }
    }

    // メイン処理
    async function init() {
        try {
            log('Initialization started');
            // フォームが読み込まれるのを待つ
            await waitForElement('form');
            log('Form element found');

            createTemplateUI();
            log('UI created successfully');
        } catch (error) {
            log(`Error during initialization: ${error.message}`);
            console.error(error);
        }
    }

    // 実行開始
    log('Starting script initialization');
    init();
    log('Initialization process started');
})();
