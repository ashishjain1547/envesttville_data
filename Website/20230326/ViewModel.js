url = "https://raw.githubusercontent.com/ashishjain1547/envesttville_data/main/Inventory.csv"

sep = ";"

let viewModel = function () {
    self = this;


    self.tableDataList = ko.observableArray();
    self.FilterTblGridArr = ko.observableArray();

    self.tableDataItemViewModel = function (item) {
        var self = this;
        this.Builder = ko.observable(item.Builder);
        this.PropertyName = ko.observable(item.PropertyName);
        this.BHK = ko.observable(item.BHK);
        this.ServantRoom = ko.observable(item.ServantRoom);
        this.Area = ko.observable(item.Area);
        this.Construction = ko.observable(item.Construction);
        this.Rate = ko.observable(item.Rate);
        this.City = ko.observable(item.City);
        this.ImageSrc = ko.observable("url('" + item.ImageSrc + "')");
    };

    self.getData = function () {
        $.get(url, function (csv_data) {
            data = read_csv(csv_data, sep);

            self.tableDataList($.map(data, function (item) {
                return new self.tableDataItemViewModel(item);
            }));

            self.FilterTblGridArr(self.tableDataList());
        });
    };


    this.builderFilterValue = ko.observable();
    this.builderFilterArray = ko.computed(function () {
        var builderFilter = self.builderFilterValue();
        self.tableDataList([]);
        if (!builderFilter || builderFilter === "") {
            self.tableDataList(self.FilterTblGridArr());
        } else {
            var data = ko.utils.arrayFilter(self.FilterTblGridArr(), function (elem) {
                return elem.Builder().toLowerCase().indexOf(builderFilter.toLowerCase()) !== -1;
            });
            self.tableDataList(data);
        }
    });

    this.propertyFilterValue = ko.observable();
    this.propertyFilterArray = ko.computed(function () {
        let filterVal = self.propertyFilterValue();
        self.tableDataList([]);
        if (!filterVal || filterVal === "") {
            self.tableDataList(self.FilterTblGridArr());
        } else {
            var data = ko.utils.arrayFilter(self.FilterTblGridArr(), function (elem) {
                return elem.PropertyName().toLowerCase().indexOf(filterVal.toLowerCase()) !== -1;
            });
            self.tableDataList(data);
        }
        return true;
    });

    this.constructionFilterValue = ko.observable();
    this.constructionFilterArray = ko.computed(function () {
        var constructionNameFilter = self.constructionFilterValue();
        self.tableDataList([]);
        if (!constructionNameFilter || constructionNameFilter === "") {
            self.tableDataList(self.FilterTblGridArr());
        } else {
            var data = ko.utils.arrayFilter(self.FilterTblGridArr(), function (elem) {
                return elem.Construction().toLowerCase().indexOf(constructionNameFilter.toLowerCase()) !== -1;
            });
            self.tableDataList(data);
        }
    });

    

    this.cityFilterValue = ko.observable();
    this.cityFilterArray = ko.computed(function () {
        var cityFilter = self.cityFilterValue();
        self.tableDataList([]);
        if (!cityFilter || cityFilter === "") {
            self.tableDataList(self.FilterTblGridArr());
        } else {
            var data = ko.utils.arrayFilter(self.FilterTblGridArr(), function (elem) {
                return elem.City().toLowerCase().indexOf(cityFilter.toLowerCase()) !== -1;
            });
            self.tableDataList(data);
        }
    });

    this.globalFilter = function(){
        self.tableDataList([]);

        var builderFilter = self.builderFilterValue();
        if (!builderFilter || builderFilter === "") {
            self.tableDataList(self.FilterTblGridArr());
        } else {
            var data = ko.utils.arrayFilter(self.FilterTblGridArr(), function (elem) {
                return elem.Builder().toLowerCase().indexOf(builderFilter.toLowerCase()) !== -1;
            });
            self.tableDataList(data);
        }


        var cityFilter = self.propertyFilterValue();
        if (cityFilter && cityFilter !== "") {
            var data = ko.utils.arrayFilter(self.tableDataList(), function (elem) {
                return elem.City().toLowerCase().indexOf(cityFilter.toLowerCase()) !== -1;
            });
            self.tableDataList(data);
        }
    }



    this.isBHKSortingOrder = ko.observable(true);
    this.bhkSorting = function () {
        var data = self.tableDataList();
        if (self.isBHKSortingOrder()) {
            data.sort(function (a, b) {
                var aID = a.BHK();
                var bID = b.BHK();
                return (aID === bID) ? 0 : (aID > bID) ? 1 : -1;
            });
            self.isBHKSortingOrder(false);
        } else {
            data.sort(function (a, b) {
                var aID = a.BHK();
                var bID = b.BHK();
                return (aID === bID) ? 0 : (aID > bID) ? -1 : 1;
            });
            self.isBHKSortingOrder(true);
        }
        self.tableDataList(data);
    };


    this.isAreaSortingOrder = ko.observable(true);
    this.areaSorting = function () {
        var data = self.tableDataList();
        if (self.isAreaSortingOrder()) {
            data.sort(function (a, b) {
                var aID = parseFloat(a.Area());
                var bID = parseFloat(b.Area());
                return (aID === bID) ? 0 : (aID > bID) ? 1 : -1;
            });
            self.isAreaSortingOrder(false);
        } else {
            data.sort(function (a, b) {
                var aID = parseFloat(a.Area());
                var bID = parseFloat(b.Area());
                return (aID === bID) ? 0 : (aID > bID) ? -1 : 1;
            });
            self.isAreaSortingOrder(true);
        }
        self.tableDataList(data);
    };

    this.isRateSortingOrder = ko.observable(true);
    this.rateSorting = function () {
        var data = self.tableDataList();
        if (self.isRateSortingOrder()) {
            data.sort(function (a, b) {
                var aID = parseFloat(a.Rate());
                var bID = parseFloat(b.Rate());
                return (aID === bID) ? 0 : (aID > bID) ? 1 : -1;
            });
            self.isRateSortingOrder(false);
        } else {
            data.sort(function (a, b) {
                var aID = parseFloat(a.Rate());
                var bID = parseFloat(b.Rate());
                return (aID === bID) ? 0 : (aID > bID) ? -1 : 1;
            });
            self.isRateSortingOrder(true);
        }
        self.tableDataList(data);
    };

}

ko.applyBindings(viewModel)
