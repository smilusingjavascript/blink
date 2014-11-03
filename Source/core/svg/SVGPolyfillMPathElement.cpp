// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

#include "config.h"
#include "core/svg/SVGPolyfillMPathElement.h"

namespace blink {

inline SVGPolyfillMPathElement::SVGPolyfillMPathElement(Document& document)
    : SVGElement(SVGNames::mpathTag, document)
{
}

DEFINE_NODE_FACTORY(SVGPolyfillMPathElement)

}
