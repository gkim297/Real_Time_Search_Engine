document.addEventListener('DOMContentLoaded', function() {
    const sampleData = {
        "대한민국": {
            "1-10": ["키위", "사과", "바나나", "자두", "수박", "멜론", "포도", "체리", "복숭아", "오렌지"],
            "11-20": ["레몬", "라임", "파인애플", "블루베리", "망고", "딸기", "블랙베리", "구아바", "패션프루트", "키위베리"]
        },
        "미국": {
            "1-10": ["Apple", "Banana", "Cherry", "Date", "Fig", "Grape", "Honeydew", "Kiwi", "Lime", "Mango"],
            "11-20": ["Nectarine", "Orange", "Pineapple", "Quince", "Raspberry", "Strawberry", "Tangerine", "Ugli Fruit", "Vanilla Bean", "Watermelon"]
        },
        "캐나다": {
            "1-10": ["Érable", "Airelle", "Buffaloberry", "Griotte", "Baie de sureau", "Groseille", "Airelle", "Genièvre", "Mooseberry", "Salmonberry"],
            "11-20": ["Amélanchier", "Framboisier", "Pérennité", "Xigua", "Jaune baie", "Vigne en Zigzag", "Myrtille", "Lingonberry", "Dewberry", "Raisin gelé"]
        },
        "일본": {
            "1-10": ["さくらんぼ", "みかん", "りんご", "ぶどう", "ばなな", "すいか", "めろん", "もも", "いちご", "キウイ"],
            "11-20": ["パイナップル", "マンゴー", "オレンジ", "パッションフル", "ライチ", "ココナッツ", "レモン", "ライム", "チェリー", "ブルーベリー"]
        },
        "대만": {
            "1-10": ["鳳梨", "芭樂", "龍眼", "荔枝", "椰子", "木瓜", "香蕉", "芒果", "柿子", "櫻桃"],
            "11-20": ["桃子", "西瓜", "柚子", "橙子", "檸檬", "蘋果", "葡萄", "草莓", "蓮霧", "杏子"]
        }
    };

    function updateRankings(country) {
        const rankings1to10 = document.querySelector('.ranking-section:nth-child(1) ol');
        const rankings11to20 = document.querySelector('.ranking-section:nth-child(2) ol');

        rankings1to10.innerHTML = sampleData[country]["1-10"].map(item => `<li>${item}</li>`).join("");
        rankings11to20.innerHTML = sampleData[country]["11-20"].map(item => `<li>${item}</li>`).join("");

        // Update the timestamp timezone based on the country
        switch(country) {
            case "대한민국":
                updateTimestamp("Asia/Seoul");
                break;
            case "미국":
                updateTimestamp("America/New_York");
                break;
            case "캐나다":
                updateTimestamp("America/Los_Angeles");
                break;
            case "일본":
                updateTimestamp("Asia/Tokyo");
                break;
            case "대만":
                updateTimestamp("Asia/Taipei");
                break;
            default:
                break;
        }
    }

    function updateTimestamp(timeZone) {
        const options = {
            timeZone: timeZone,
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };
        const formatter = new Intl.DateTimeFormat('en-US', options);
        document.querySelector('.timestamp').textContent = formatter.format(new Date());
    }

    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    dropdownToggle.addEventListener('click', function() {
        dropdownMenu.style.display = dropdownMenu.style.display === 'none' || dropdownMenu.style.display === '' ? 'block' : 'none';
    });

    dropdownMenu.addEventListener('click', function(event) {
        if(event.target && event.target.matches('a[data-country]')) {
            const selectedCountry = event.target.getAttribute('data-country');
            updateRankings(selectedCountry);
            dropdownMenu.style.display = 'none'; // Hide the dropdown after selection
        }
    });

    window.addEventListener('click', function(event) {
        if (!event.target.matches('.dropdown-toggle')) {
            dropdownMenu.style.display = 'none';
        }
    });

    updateRankings("대한민국"); // Initially display 대한민국 rankings and time
});